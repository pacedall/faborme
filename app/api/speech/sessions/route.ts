import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { inngest } from '@/inngest/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const formData = await request.formData()
  const audioFile = formData.get('audio') as File | null
  if (!audioFile) return NextResponse.json({ error: 'No audio file' }, { status: 400 })

  const serviceClient = createServiceClient()

  const { data: session, error: sessionError } = await serviceClient
    .from('speech_sessions')
    .insert({ user_id: user.id, status: 'pending' })
    .select().single()

  if (sessionError || !session) return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })

  const audioKey = `recordings/${user.id}/${session.id}.webm`
  const audioBuffer = await audioFile.arrayBuffer()
  const { error: uploadError } = await serviceClient.storage.from('audio').upload(audioKey, audioBuffer, { contentType: 'audio/webm', upsert: false })
  if (uploadError) return NextResponse.json({ error: 'Upload failed' }, { status: 500 })

  await serviceClient.from('speech_sessions').update({ audio_r2_key: audioKey, status: 'transcribing' }).eq('id', session.id)

  await inngest.send({ name: 'speech/session.completed', data: { sessionId: session.id, userId: user.id, audioKey, accent: 'neutral_uk' } })

  return NextResponse.json({ sessionId: session.id })
}
