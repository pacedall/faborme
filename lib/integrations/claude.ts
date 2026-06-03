import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
export const MODEL = 'claude-sonnet-4-5'

export const SPEECH_SCORING_SYSTEM = `You are an expert British English communication coach.
Analyse the provided transcript and return ONLY valid JSON with no markdown formatting.
Focus on professional communication quality: clarity, confidence, articulation, and executive presence.
Be specific, constructive, and calibrated — scores should reflect real performance, not empty encouragement.`

export async function scoreSpeech(transcript: string, exerciseContext?: string) {
  const prompt = `Transcript to analyse:
${transcript}

${exerciseContext ? `Exercise context: ${exerciseContext}` : ''}

Return this exact JSON structure:
{
  "confidence": 0-100, "clarity": 0-100, "professional_tone": 0-100, "articulation": 0-100,
  "persuasiveness": 0-100, "executive_presence": 0-100, "sentence_flow": 0-100, "overall": 0-100,
  "filler_words": ["list"], "filler_count": 0,
  "key_strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "summary": "2-sentence coaching summary in a direct, professional tone"
}`
  const response = await anthropic.messages.create({ model: MODEL, max_tokens: 1024, system: SPEECH_SCORING_SYSTEM, messages: [{ role: 'user', content: prompt }] })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

export async function reviewCV(cvText: string, targetRole?: string, sector?: string) {
  const response = await anthropic.messages.create({
    model: MODEL, max_tokens: 2048,
    system: `You are a senior UK recruiter and career coach with 15 years of experience across ${sector || 'professional services'}.
Review CVs against UK conventions: no photo, two pages max, achievement-led bullets, UK date format. Return ONLY valid JSON.`,
    messages: [{ role: 'user', content: `CV text:
${cvText}

${targetRole ? `Target role: ${targetRole}` : ''}

Return:
{
  "ats_score": 0-100, "overall_impression": "2-3 sentences",
  "strengths": ["s1","s2","s3"], "critical_issues": ["i1","i2"],
  "line_edits": [{"original":"...","suggested":"...","reason":"..."}],
  "missing_elements": ["e1","e2"], "likely_interview_questions": ["q1","q2","q3"]
}` }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

export async function rewriteLinkedIn(headline: string, about: string, experience: string) {
  const response = await anthropic.messages.create({
    model: MODEL, max_tokens: 2048,
    system: `You are a UK LinkedIn optimisation expert. Rewrite profiles using UK recruiter idiom. Be specific and confident. Eliminate passive voice. Return ONLY valid JSON.`,
    messages: [{ role: 'user', content: `Current headline: ${headline}
Current about: ${about}
Current experience summary: ${experience}

Rewrite for a UK professional audience. Return:
{
  "headline": "max 220 chars", "about": "max 2600 chars",
  "experience_bullets": ["b1","b2","b3"], "keywords_added": ["k1","k2"],
  "changes_summary": "brief explanation"
}` }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}

export async function scoreInterviewAnswer(question: string, answer: string, mode: string, sector?: string) {
  const response = await anthropic.messages.create({
    model: MODEL, max_tokens: 1024,
    system: `You are an expert interview coach. Score answers on structure, evidence, clarity, and relevance.
For behavioural questions use the STAR framework. Return ONLY valid JSON.`,
    messages: [{ role: 'user', content: `Question: ${question}
Answer: ${answer}
Mode: ${mode}
${sector ? `Sector: ${sector}` : ''}

Return:
{
  "structure": 0-100, "evidence": 0-100, "clarity": 0-100, "relevance": 0-100, "overall": 0-100,
  "star_completeness": {"situation":true,"task":true,"action":true,"result":true},
  "strengths": ["s1"], "improvements": ["i1","i2"],
  "model_answer_hint": "brief pointer"
}` }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return JSON.parse(text)
}
