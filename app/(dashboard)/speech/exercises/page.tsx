import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const MODULES = [
  { slug: 'breath', title: 'Breath, support & projection', count: 8, icon: '◎' },
  { slug: 'consonants', title: 'Consonant articulation', count: 10, icon: '◈' },
  { slug: 'vowels', title: 'Vowel placement & rounding', count: 8, icon: '◇' },
  { slug: 'pace', title: 'Pace & pause architecture', count: 6, icon: '◉' },
  { slug: 'pitch', title: 'Pitch variance & intonation', count: 8, icon: '◆' },
  { slug: 'fillers', title: 'Filler elimination', count: 6, icon: '◐' },
  { slug: 'accent', title: 'Accent softening', count: 8, icon: '⬡' },
  { slug: 'pressure', title: 'Performance under pressure', count: 6, icon: '◎' },
]

export const metadata = { title: 'Speech Exercises' }

export default async function ExercisesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: progress } = await supabase.from('speech_progress').select('module_slug, best_score, attempts').eq('user_id', user!.id)

  const progressByModule: Record<string, { best: number; attempts: number }> = {}
  progress?.forEach((p) => {
    if (!progressByModule[p.module_slug]) progressByModule[p.module_slug] = { best: 0, attempts: 0 }
    progressByModule[p.module_slug].attempts += p.attempts
    progressByModule[p.module_slug].best = Math.max(progressByModule[p.module_slug].best, p.best_score)
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-semibold" style={{ color: 'var(--purple)' }}>Curriculum</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>60 exercises across 8 modules — structured elocution coaching</p>
        </div>
        <Link href="/speech" className="btn-secondary text-sm py-2 px-4">← Free session</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {MODULES.map((m) => {
          const prog = progressByModule[m.slug]
          return (
            <div key={m.slug} className="card-hover p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: 'var(--lilac)', color: 'var(--violet)' }}>{m.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--purple)' }}>{m.title}</h3>
                  <span className="text-xs shrink-0" style={{ color: 'var(--muted)' }}>{m.count} exercises</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {prog ? (
                    <>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                        <div className="h-full rounded-full" style={{ width: `${prog.best}%`, background: 'var(--violet)' }} />
                      </div>
                      <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{prog.attempts} attempts</span>
                    </>
                  ) : (<span className="text-xs" style={{ color: 'var(--muted)' }}>Not started</span>)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
