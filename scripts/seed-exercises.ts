import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const exercises = [
  { slug: 'breath-01', module: 'breath', target_text: 'Take a deep breath and hold it for three counts. Now release slowly through your lips, keeping your jaw relaxed.', target_accent: 'neutral_uk' },
  { slug: 'breath-02', module: 'breath', target_text: 'With each sentence, breathe from your diaphragm. Your shoulders should remain still as you inhale.', target_accent: 'neutral_uk' },
  { slug: 'consonants-01', module: 'consonants', target_text: 'Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked.', target_accent: 'neutral_uk' },
  { slug: 'consonants-02', module: 'consonants', target_text: 'She sells seashells by the seashore. The shells she sells are surely seashells.', target_accent: 'rp' },
  { slug: 'consonants-03', module: 'consonants', target_text: 'The thirty-three thieves thought that they thrilled the throne throughout Thursday.', target_accent: 'neutral_uk' },
  { slug: 'vowels-01', module: 'vowels', target_text: 'How now brown cow. The sound is round and full, produced deep in the throat.', target_accent: 'rp' },
  { slug: 'vowels-02', module: 'vowels', target_text: 'The goose and the moose are loose in the juice. Say each vowel sound with precision.', target_accent: 'neutral_uk' },
  { slug: 'pace-01', module: 'pace', target_text: 'I want you to speak with deliberate pauses. Each pause marks a moment of intention. The pause is powerful.', target_accent: 'neutral_uk' },
  { slug: 'pace-02', module: 'pace', target_text: 'Slow down when you reach your most important point. Speed up slightly for background context, then slow again for the conclusion.', target_accent: 'neutral_uk' },
  { slug: 'pitch-01', module: 'pitch', target_text: 'Start this sentence at a mid pitch. Rise slightly on the key word. Then fall decisively at the end.', target_accent: 'neutral_uk' },
  { slug: 'pitch-02', module: 'pitch', target_text: 'Questions rise. Statements fall. Commands stay level. Practise each pattern deliberately.', target_accent: 'neutral_uk' },
  { slug: 'fillers-01', module: 'fillers', target_text: 'When you reach for a filler word, replace it with silence. Silence is confidence. Silence is control.', target_accent: 'neutral_uk' },
  { slug: 'fillers-02', module: 'fillers', target_text: 'I will now explain our quarterly results. The first quarter showed strong growth. The second quarter presented challenges. The full year remains on track.', target_accent: 'neutral_uk' },
  { slug: 'accent-01', module: 'accent', target_text: 'The rain in Spain falls mainly in the plain. Elongate the vowel sounds and articulate each final consonant clearly.', target_accent: 'rp' },
  { slug: 'accent-02', module: 'accent', target_text: 'How are you this evening? I am very well, thank you for asking. We have a great deal to discuss today.', target_accent: 'rp' },
  { slug: 'pressure-01', module: 'pressure', target_text: 'You are presenting to the board. They are looking at you. Three seconds of silence before you begin. Now speak with total authority.', target_accent: 'neutral_uk' },
  { slug: 'pressure-02', module: 'pressure', target_text: 'Answer this question directly: What is your greatest professional achievement and why? Begin without hesitation.', target_accent: 'neutral_uk' },
]

async function seed() {
  console.log(`Seeding ${exercises.length} exercises...`)
  for (const ex of exercises) {
    const { error } = await supabase.from('speech_exercises').upsert({ ...ex, rubric_jsonb: {} }, { onConflict: 'slug' })
    console.log(error ? `Failed: ${ex.slug} — ${error.message}` : `✓ ${ex.slug}`)
  }
  console.log('Done.')
}

seed().catch(console.error)
