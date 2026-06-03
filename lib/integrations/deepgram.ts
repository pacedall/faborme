import { createClient } from '@deepgram/sdk'

export const deepgram = createClient(process.env.DEEPGRAM_API_KEY!)

export interface TranscriptWord { word: string; start: number; end: number; confidence: number; punctuated_word?: string }
export interface DeepgramResult { transcript: string; words: TranscriptWord[]; duration: number; wpm: number; fillerWords: string[]; fillerCount: number }

export async function transcribeAudio(audioBuffer: Buffer): Promise<DeepgramResult> {
  const { result } = await deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
    model: 'nova-3', language: 'en-GB', smart_format: true, punctuate: true, diarize: false, filler_words: true,
  })
  const channel = result?.results?.channels?.[0]?.alternatives?.[0]
  if (!channel) throw new Error('Deepgram returned no transcript')

  const transcript = channel.transcript || ''
  const words: TranscriptWord[] = (channel.words || []).map((w: any) => ({ word: w.word, start: w.start, end: w.end, confidence: w.confidence, punctuated_word: w.punctuated_word }))
  const duration = result?.metadata?.duration || 0
  const wpm = duration > 0 ? Math.round((words.length / duration) * 60) : 0

  const FILLER_PATTERNS = ['um', 'uh', 'er', 'ah', 'like', 'you know', 'sort of', 'kind of', 'basically', 'literally']
  const fillerWords: string[] = []
  let fillerCount = 0
  const lower = transcript.toLowerCase()
  for (const filler of FILLER_PATTERNS) {
    const matches = lower.match(new RegExp(`\\b${filler}\\b`, 'gi'))
    if (matches) { fillerWords.push(filler); fillerCount += matches.length }
  }
  return { transcript, words, duration, wpm, fillerWords, fillerCount }
}
