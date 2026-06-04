import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { data: session } = await supabase.from('speech_sessions').select('*').eq('id', id).eq('user_id', user.id).single()
  if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(session)
}
