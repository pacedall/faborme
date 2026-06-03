export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type UserRole = 'user' | 'coach' | 'admin'
export type PlanTier = 'starter' | 'practitioner' | 'premium'
export type OrgType = 'personal' | 'team' | 'enterprise'
export type SubStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
export type SpeechSessionStatus = 'pending' | 'transcribing' | 'analysing' | 'scoring' | 'synthesising' | 'complete' | 'failed'
export type CoachReviewStatus = 'queued' | 'claimed' | 'complete' | 'sla_breached'
export type InterviewMode = 'behavioural' | 'technical' | 'speech_led'
export type UserSegment = 'graduate' | 'professional' | 'executive' | 'sales' | 'consultant' | 'non_native'

export interface Database {
  public: {
    Tables: {
      organisations: {
        Row: { id: string; type: OrgType; name: string; plan_tier: PlanTier; sso_provider: string | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['organisations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['organisations']['Insert']>
      }
      users: {
        Row: { id: string; org_id: string; email: string; role: UserRole; segment: UserSegment | null; locale: string; created_at: string }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      subscriptions: {
        Row: { id: string; user_id: string; stripe_sub_id: string; tier: PlanTier; status: SubStatus; current_period_end: string; cancel_at_period_end: boolean }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
      user_profiles: {
        Row: { user_id: string; first_name: string | null; surname: string | null; target_sector: string | null; target_role: string | null; years_experience: number | null; education_jsonb: Json | null; experience_jsonb: Json | null }
        Insert: Partial<Database['public']['Tables']['user_profiles']['Row']> & { user_id: string }
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
      }
      speech_sessions: {
        Row: { id: string; user_id: string; exercise_slug: string | null; audio_r2_key: string | null; status: SpeechSessionStatus; transcript_jsonb: Json | null; metrics_jsonb: Json | null; semantic_scores_jsonb: Json | null; target_audio_r2_key: string | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['speech_sessions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['speech_sessions']['Insert']>
      }
      speech_exercises: {
        Row: { slug: string; module: string; target_text: string; target_accent: string; rubric_jsonb: Json; segment_filter: UserSegment[] | null }
        Insert: Database['public']['Tables']['speech_exercises']['Row']
        Update: Partial<Database['public']['Tables']['speech_exercises']['Insert']>
      }
      speech_progress: {
        Row: { user_id: string; module_slug: string; exercise_slug: string; best_score: number; attempts: number; last_attempt_at: string }
        Insert: Omit<Database['public']['Tables']['speech_progress']['Row'], 'last_attempt_at'>
        Update: Partial<Database['public']['Tables']['speech_progress']['Insert']>
      }
      cv_documents: {
        Row: { id: string; user_id: string; source_file_r2_key: string | null; ats_score: number | null; claude_review_jsonb: Json | null; exported_versions_jsonb: Json | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['cv_documents']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cv_documents']['Insert']>
      }
      linkedin_drafts: {
        Row: { id: string; user_id: string; original_jsonb: Json | null; rewritten_jsonb: Json | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['linkedin_drafts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['linkedin_drafts']['Insert']>
      }
      interview_sessions: {
        Row: { id: string; user_id: string; mode: InterviewMode; sector: string | null; questions_jsonb: Json | null; answers_jsonb: Json | null; scores_jsonb: Json | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['interview_sessions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['interview_sessions']['Insert']>
      }
      coaches: {
        Row: { user_id: string; specialisms: string[]; hourly_rate_gbp: number; stripe_connect_id: string | null; active: boolean }
        Insert: Database['public']['Tables']['coaches']['Row']
        Update: Partial<Database['public']['Tables']['coaches']['Insert']>
      }
      coach_reviews: {
        Row: { id: string; user_id: string; coach_id: string | null; source_type: string; source_id: string; requested_at: string; claimed_at: string | null; completed_at: string | null; video_r2_key: string | null; sla_breached: boolean }
        Insert: Omit<Database['public']['Tables']['coach_reviews']['Row'], 'id' | 'requested_at'>
        Update: Partial<Database['public']['Tables']['coach_reviews']['Insert']>
      }
    }
  }
}
