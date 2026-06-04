import { Inngest } from 'inngest'

export const inngest = new Inngest({ id: 'faborme' })

export type Events = {
  'speech/session.completed': { data: { sessionId: string; userId: string; audioKey: string; accent: string } }
  'coach/review.requested': { data: { reviewId: string; userId: string } }
  'coach/sla.check': { data: Record<string, never> }
  'billing/subscription.updated': { data: { userId: string; tier: string; status: string } }
}
