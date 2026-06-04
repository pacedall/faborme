import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { rewriteLinkedIn } from '@/lib/integrations/claude'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { headline, about, experience } = await request.json()
  if (!headline || !about) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const rewritten = await rewriteLinkedIn(headline, about, experience || '')

  const serviceClient = createServiceClient()
  await serviceClient.from('linkedin_drafts').insert({ user_id: user.id, original_jsonb: { headline, about, experience }, rewritten_jsonb: rewritten })

  return NextResponse.json(rewritten)
}
