import { inngest } from '../client'
import { createServiceClient } from '@/lib/supabase/service'

// Runs every 15 minutes — flags overdue coach reviews (48h SLA)
export const coachSlaMonitor = inngest.createFunction(
  { id: 'coach-sla-monitor' },
  { cron: '*/15 * * * *' },
  async ({ step }) => {
    await step.run('check-sla', async () => {
      const supabase = createServiceClient()
      const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      const { data: overdue } = await supabase.from('coach_reviews').select('id').is('completed_at', null).lt('requested_at', cutoff).eq('sla_breached', false)
      if (overdue && overdue.length > 0) {
        await supabase.from('coach_reviews').update({ sla_breached: true }).in('id', overdue.map((r) => r.id))
      }
      return { flagged: overdue?.length ?? 0 }
    })
  }
)
