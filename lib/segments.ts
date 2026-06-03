import type { UserSegment } from '@/types/database'

export const SEGMENTS: Record<UserSegment, { label: string; description: string }> = {
  graduate: { label: 'Graduate / Early Career', description: 'Recently graduated or in your first 1–2 years of work' },
  professional: { label: 'Mid-Level Professional', description: 'Established in your career, aiming higher' },
  executive: { label: 'Executive / Senior Leader', description: 'Leading teams, presenting to boards, representing organisations' },
  sales: { label: 'Sales Professional', description: 'Client-facing; your voice is your revenue' },
  consultant: { label: 'Consultant / Advisor', description: 'Delivering recommendations and building trust under scrutiny' },
  non_native: { label: 'Non-Native English Speaker', description: 'English is not your first language; you want to communicate with confidence' },
}

export const SECTORS = [
  'Finance & Banking', 'Legal', 'Consulting', 'Technology', 'Healthcare & NHS',
  'Public Sector & Civil Service', 'Marketing & Media', 'Sales', 'Academic & Research', 'Other',
] as const

export type Sector = (typeof SECTORS)[number]

export const SEGMENT_ACCENT: Record<UserSegment, string> = {
  graduate: 'neutral_uk', professional: 'neutral_uk', executive: 'rp',
  sales: 'estuary', consultant: 'rp', non_native: 'neutral_uk',
}

export const SECTOR_TEMPLATE: Record<string, string> = {
  'Finance & Banking': 'city_finance', Legal: 'magic_circle', Consulting: 'big_four',
  Technology: 'tech', 'Healthcare & NHS': 'nhs_clinical', 'Public Sector & Civil Service': 'civil_service',
  'Marketing & Media': 'creative', Sales: 'commercial', 'Academic & Research': 'russell_group', Other: 'generic_uk',
}
