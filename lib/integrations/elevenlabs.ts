import { ElevenLabsClient } from 'elevenlabs'

export const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY! })

const VOICE_IDS: Record<string, string> = {
  rp: process.env.ELEVENLABS_VOICE_RP || '',
  estuary: process.env.ELEVENLABS_VOICE_ESTUARY || '',
  neutral_uk: process.env.ELEVENLABS_VOICE_NEUTRAL || '',
}

export async function synthesiseTargetAudio(text: string, accent: string = 'neutral_uk'): Promise<Buffer> {
  const voiceId = VOICE_IDS[accent] || VOICE_IDS.neutral_uk
  if (!voiceId) throw new Error(`No ElevenLabs voice configured for accent: ${accent}`)
  const audio = await elevenlabs.generate({
    voice: voiceId, text, model_id: 'eleven_turbo_v2_5',
    voice_settings: { stability: 0.75, similarity_boost: 0.85, style: 0.2 },
  })
  const chunks: Buffer[] = []
  for await (const chunk of audio) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks)
}
