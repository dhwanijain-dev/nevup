export interface BadgeDef {
  tier: string
  min: number
  colorClass: string
  accent: string
  description?: string
}

// Updated tier naming sequence: rabbit < raider < assasin < hunter < Connoisseur
// Retain previous color styling mapped to ascending prestige.
export const BADGES: BadgeDef[] = [
  { tier: 'rabbit', min: 0, colorClass: 'bg-amber-800/25 text-amber-300 border-amber-700/40', accent: '#b87333', description: 'New to the path. Learning fundamentals and forming habits.' },
  { tier: 'raider', min: 1000, colorClass: 'bg-slate-500/25 text-slate-200 border-slate-400/40', accent: '#c0c0c0', description: 'Showing initiative and tactical growth.' },
  { tier: 'assasin', min: 2000, colorClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40', accent: '#ffd700', description: 'Sharpened precision and consistent execution.' },
  { tier: 'hunter', min: 3000, colorClass: 'bg-cyan-400/15 text-cyan-200 border-cyan-300/40', accent: '#7df9ff', description: 'Advanced tracking, timing, and strategic adaptation.' },
  { tier: 'Connoisseur', min: 4000, colorClass: 'bg-[#38ff7e]/20 text-[#38ff7e] border-[#38ff7e]/40', accent: '#38ff7e', description: 'Master-level insight and refined methodology.' },
]

export interface BadgeInfo {
  current: BadgeDef
  nextThreshold: number | null
  progressToNext: number
}

export function getBadge(xp: number): BadgeInfo {
  let current = BADGES[0]
  for (const b of BADGES) {
    if (xp >= b.min) current = b
  }
  const next = BADGES.find(b => b.min > current.min && xp < b.min)
  const nextThreshold = next?.min ?? null
  const progressToNext = nextThreshold ? Math.min(100, Math.round(((xp - current.min) / (nextThreshold - current.min)) * 100)) : 100
  return { current, nextThreshold, progressToNext }
}
