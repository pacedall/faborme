import { inngest } from '../client'
import { createServiceClient } from '@/lib/supabase/service'
import { transcribeAudio } from '@/lib/integrations/deepgram'
import { scoreSpeech } from '@/lib/integrations/claude'
import { synthesiseTargetAudio } from '@/lib/integrations/elevenlabs'
import { sendEmail, FROM } from '@/lib/integrations/resend'
import SpeechReadyEmail from '@/emails/SpeechReadyEmail'
import React from 'react'

export const speechPipeline = inngest.createFunction(
  { id: 'speech-pipeline', retries: 2 },
  { event: 'speech/session.completed' },
  async ({ event, step }) => {
    const { sessionId, userId, audioKey, accent } = event.data
    const supabase = createServiceClient()

    const audioBuffer = await step.run('download-audio', async () => {
      const { data, error } = await supabase.storage.from('audio').download(audioKey)
      if (error) throw error
      return Buffer.from(await data.arrayBuffer())
    })

    const transcriptResult = await step.run('transcribe', async () => {
      const result = await transcribeAudio(audioBuffer)
      await supabase.from('speech_sessions').update({ status: 'analysing', transcript_jsonb: result }).eq('id', sessionId)
      return result
    })

    const metrics = await step.run('analyse-metrics', async () => {
      const fillerRatio = transcriptResult.fillerCount / Math.max(1, transcriptResult.words.length)
      const m = {
        wpm: transcriptResult.wpm, duration_seconds: transcriptResult.duration, word_count: transcriptResult.words.length,
        filler_count: transcriptResult.fillerCount, filler_words: transcriptResult.fillerWords, filler_ratio: fillerRatio,
        pace_rating: transcriptResult.wpm < 120 ? 'slow' : transcriptResult.wpm > 170 ? 'fast' : 'good',
      }
      await supabase.from('speech_sessions').update({ metrics_jsonb: m, status: 'scoring' }).eq('id', sessionId)
      return m
    })

    const scores = await step.run('score-semantics', async () => {
      const result = await scoreSpeech(transcriptResult.transcript)
      await supabase.from('speech_sessions').update({ semantic_scores_jsonb: result, status: 'synthesising' }).eq('id', sessionId)
      return result
    })

    const targetAudioKey = await step.run('synthesise-playback', async () => {
      const excerpt = transcriptResult.transcript.slice(0, 200)
      if (!excerpt) return null
      const audioData = await synthesiseTargetAudio(excerpt, accent)
      const key = `playback/${sessionId}.mp3`
      const { error } = await supabase.storage.from('audio').upload(key, audioData, { contentType: 'audio/mpeg', upsert: true })
      if (error) throw error
      return key
    })

    await step.run('notify-user', async () => {
      const { data: userRow } = await supabase.from('users').select('email').eq('id', userId).single()
      const { data: profile } = await supabase.from('user_profiles').select('first_name').eq('user_id', userId).single()
      if (userRow?.email) {
        await sendEmail({
          to: userRow.email, subject: `Your session scored ${Math.round(scores.overall ?? 0)} — see the breakdown`, from: FROM.default,
          react: React.createElement(SpeechReadyEmail, { firstName: profile?.first_name ?? undefined, sessionId, overallScore: Math.round(scores.overall ?? 0), topImprovement: scores.improvements?.[0] }),
        })
      }
    })

    await step.run('finalise', async () => {
      await supabase.from('speech_sessions').update({ status: 'complete', target_audio_r2_key: targetAudioKey }).eq('id', sessionId)
    })

    return { sessionId, wpm: metrics.wpm, overall: scores.overall }
  }
)
