import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { reviewCV } from '@/lib/integrations/claude'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const targetRole = formData.get('targetRole') as string | undefined
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  // NOTE: For production, add pdf-parse and mammoth for proper extraction.
  let cvText = ''
  try { cvText = await file.text() } catch { cvText = '[CV text extraction stub — integrate pdf-parse and mammoth for production]' }

  const review = await reviewCV(cvText, targetRole)

  const serviceClient = createServiceClient()
  const fileKey = `cvs/${user.id}/${Date.now()}.${file.name.split('.').pop()}`
  const buffer = await file.arrayBuffer()
  await serviceClient.storage.from('uploads').upload(fileKey, buffer, { upsert: false })
  await serviceClient.from('cv_documents').insert({ user_id: user.id, source_file_r2_key: fileKey, ats_score: review.ats_score, claude_review_jsonb: review })

  return NextResponse.json(review)
}
