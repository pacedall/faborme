import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen flex" style={{ background: '#f9f9fb' }}>
      <DashboardNav user={user} />
      <main className="flex-1 ml-64 p-8 page-enter">{children}</main>
    </div>
  )
}
