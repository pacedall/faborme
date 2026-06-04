import { createClient } from '@/lib/supabase/server'
import { scoreInterviewAnswer, anthropic, MODEL } from '@/lib/integrations/claude'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body = await request.json()

  if (body.action === 'generate_questions') {
    const { mode, sector } = body
    const response = await anthropic.messages.create({
      model: MODEL, max_tokens: 1024,
      system: `You are an expert UK interview coach. Generate interview questions. Return ONLY valid JSON.`,
      messages: [{ role: 'user', content: `Generate 4 ${mode} interview questions for a candidate targeting ${sector} roles in the UK.
Return: { "questions": ["question 1", "question 2", "question 3", "question 4"] }` }],
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    return NextResponse.json(JSON.parse(text))
  }

  if (body.action === 'score_answer') {
    const { question, answer, mode, sector } = body
    const score = await scoreInterviewAnswer(question, answer, mode, sector)
    return NextResponse.json({ score })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
