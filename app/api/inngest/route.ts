import { serve } from 'inngest/next'
import { inngest } from '@/inngest/client'
import { speechPipeline } from '@/inngest/functions/speech-pipeline'
import { coachSlaMonitor } from '@/inngest/functions/coach-sla'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [speechPipeline, coachSlaMonitor],
})
