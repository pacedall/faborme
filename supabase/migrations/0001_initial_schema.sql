-- FaborMe — Initial Schema. Run once in Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- ENUMS
create type org_type as enum ('personal', 'team', 'enterprise');
create type plan_tier as enum ('starter', 'practitioner', 'premium');
create type user_role as enum ('user', 'coach', 'admin');
create type sub_status as enum ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
create type speech_status as enum ('pending', 'transcribing', 'analysing', 'scoring', 'synthesising', 'complete', 'failed');
create type user_segment as enum ('graduate', 'professional', 'executive', 'sales', 'consultant', 'non_native');
create type interview_mode as enum ('behavioural', 'technical', 'speech_led');

-- IDENTITY & TENANCY
create table organisations (
  id uuid primary key default gen_random_uuid(),
  type org_type not null default 'personal',
  name text not null,
  plan_tier plan_tier not null default 'starter',
  sso_provider text,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid references organisations(id),
  email text not null unique,
  role user_role not null default 'user',
  segment user_segment,
  locale text not null default 'en-GB',
  created_at timestamptz not null default now()
);

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
declare new_org_id uuid;
begin
  insert into organisations (type, name) values ('personal', new.email) returning id into new_org_id;
  insert into users (id, org_id, email) values (new.id, new_org_id, new.email);
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure handle_new_user();

-- BILLING
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  stripe_sub_id text not null unique,
  tier plan_tier not null default 'starter',
  status sub_status not null default 'active',
  current_period_end timestamptz not null,
  cancel_at_period_end boolean not null default false
);
create unique index subscriptions_user_id_idx on subscriptions(user_id);

-- PROFILE
create table user_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  first_name text, surname text, target_sector text, target_role text,
  years_experience integer, education_jsonb jsonb, experience_jsonb jsonb
);

-- SPEECH ENGINE
create table speech_exercises (
  slug text primary key, module text not null, target_text text not null,
  target_accent text not null default 'neutral_uk', rubric_jsonb jsonb not null default '{}', segment_filter text[]
);

create table speech_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  exercise_slug text references speech_exercises(slug),
  audio_r2_key text, status speech_status not null default 'pending',
  transcript_jsonb jsonb, metrics_jsonb jsonb, semantic_scores_jsonb jsonb,
  target_audio_r2_key text, created_at timestamptz not null default now()
);
create index speech_sessions_user_id_idx on speech_sessions(user_id);
create index speech_sessions_status_idx on speech_sessions(status);

create table speech_progress (
  user_id uuid not null references users(id) on delete cascade,
  module_slug text not null, exercise_slug text not null,
  best_score integer not null default 0, attempts integer not null default 0,
  last_attempt_at timestamptz not null default now(),
  primary key (user_id, exercise_slug)
);

-- CV & LINKEDIN
create table cv_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source_file_r2_key text, ats_score integer, claude_review_jsonb jsonb,
  exported_versions_jsonb jsonb, created_at timestamptz not null default now()
);

create table linkedin_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  original_jsonb jsonb, rewritten_jsonb jsonb, created_at timestamptz not null default now()
);

-- INTERVIEW
create table interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  mode interview_mode not null default 'behavioural', sector text,
  questions_jsonb jsonb, answers_jsonb jsonb, scores_jsonb jsonb,
  created_at timestamptz not null default now()
);

-- COACH WORKFLOW
create table coaches (
  user_id uuid primary key references users(id) on delete cascade,
  specialisms text[] not null default '{}', hourly_rate_gbp integer not null default 0,
  stripe_connect_id text, active boolean not null default true
);

create table coach_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  coach_id uuid references coaches(user_id),
  source_type text not null default 'speech_session', source_id text not null,
  requested_at timestamptz not null default now(), claimed_at timestamptz,
  completed_at timestamptz, video_r2_key text, sla_breached boolean not null default false
);
create index coach_reviews_user_id_idx on coach_reviews(user_id);
create index coach_reviews_coach_id_idx on coach_reviews(coach_id);

-- RLS
alter table users enable row level security;
alter table subscriptions enable row level security;
alter table user_profiles enable row level security;
alter table speech_sessions enable row level security;
alter table speech_progress enable row level security;
alter table cv_documents enable row level security;
alter table linkedin_drafts enable row level security;
alter table interview_sessions enable row level security;
alter table coach_reviews enable row level security;
alter table speech_exercises enable row level security;

create policy "users_own" on users for all using (auth.uid() = id);
create policy "subscriptions_own" on subscriptions for all using (auth.uid() = user_id);
create policy "profiles_own" on user_profiles for all using (auth.uid() = user_id);
create policy "speech_sessions_own" on speech_sessions for all using (auth.uid() = user_id);
create policy "speech_progress_own" on speech_progress for all using (auth.uid() = user_id);
create policy "cv_documents_own" on cv_documents for all using (auth.uid() = user_id);
create policy "linkedin_drafts_own" on linkedin_drafts for all using (auth.uid() = user_id);
create policy "interview_sessions_own" on interview_sessions for all using (auth.uid() = user_id);
create policy "coach_reviews_own" on coach_reviews for all using (auth.uid() = user_id);
create policy "exercises_read" on speech_exercises for select using (auth.role() = 'authenticated');
