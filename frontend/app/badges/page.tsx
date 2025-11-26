"use client"

import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { BADGES } from '@/lib/badges'
import Image from 'next/image'

const TIER_COUNT = 5

function xpToTier(xp: number) {
  return Math.min(TIER_COUNT, Math.floor(xp / 1000) + 1)
}

const DEFAULT_IMAGES = Array.from({ length: TIER_COUNT }, (_, i) => `/assets/tier${i + 1}-no-bg.png`)

const BadgesPage: React.FC = () => {
  const [xp, setXp] = React.useState<number>(() => {
    try {
      const raw = localStorage.getItem('userXP')
      return raw ? parseInt(raw, 10) : 0
    } catch {
      return 0
    }
  })

  const [overrides, setOverrides] = React.useState<Record<number, string>>(() => {
    try {
      const raw = localStorage.getItem('tierImageOverrides')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const tier = xpToTier(xp)
  const defaultImage = DEFAULT_IMAGES[tier - 1]
  const currentOverride = overrides[tier] ?? null
  const displayImage = currentOverride || defaultImage
  const prevTierRef = React.useRef<number>(tier)
  const [showCongrats, setShowCongrats] = React.useState(false)
  const [showDemotion, setShowDemotion] = React.useState(false)
  const [transition, setTransition] = React.useState<{type: 'promotion' | 'demotion' | null, from: number, to: number}>({ type: null, from: tier, to: tier })
  // Reduced motion preference
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }, [])
  // aria-live message for screen readers
  const [liveMessage, setLiveMessage] = React.useState('')

  // Detect tier change and classify as promotion/demotion
  React.useEffect(() => {
    const prev = prevTierRef.current
    if (tier !== prev) {
      const type = tier > prev ? 'promotion' : 'demotion'
      setTransition({ type, from: prev, to: tier })
      if (type === 'promotion') setShowCongrats(true)
      if (type === 'demotion') setShowDemotion(true)
      // auto clear after max animation duration (2.5s promotion / 2s demotion)
      const timeout = setTimeout(() => setTransition(t => ({ ...t, type: null })), tier > prev ? 2500 : 2000)
      // announce change for accessibility
      const badgeName = BADGES[tier - 1]?.tier ?? `Tier ${tier}`
      setLiveMessage(type === 'promotion' ? `Promoted to ${badgeName}` : `Demoted to ${badgeName}`)
      return () => clearTimeout(timeout)
    }
    prevTierRef.current = tier
  }, [tier])

  React.useEffect(() => {
    try { localStorage.setItem('userXP', xp.toString()) } catch {}
  }, [xp])

  React.useEffect(() => {
    try { localStorage.setItem('tierImageOverrides', JSON.stringify(overrides)) } catch {}
  }, [overrides])

  const setOverrideForTier = (t: number, url: string | null) => {
    setOverrides(prev => {
      const next = { ...prev }
      if (!url) delete next[t]
      else next[t] = url
      return next
    })
  }

  // Radial burst particles for promotion (brand palette)
  const RadialBurst: React.FC<{count?: number}> = ({ count = 42 }) => {
    const particles = Array.from({ length: count })
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {particles.map((_, i) => {
          const angle = (i / count) * Math.PI * 2
          const dist = 140 + Math.random() * 60
          const x = Math.cos(angle) * dist
          const y = Math.sin(angle) * dist
          const color = ["#38ff7e", "#ffd666", "#36cfc9", "#73d13d", "#9254de"][i % 5]
          const style: React.CSSProperties = {
            transform: `translate(0,0)`,
            animationDelay: `${Math.random() * 120}ms`,
            '--tx': `${x}px`,
            '--ty': `${y}px`,
            background: color
          } as any
          return <span key={i} className="burst-dot absolute w-2 h-2 rounded-full" style={style} />
        })}
        <style>{`
          @keyframes burstMove { 0% { transform: translate(0,0) scale(0.6); opacity:1;} 60% { opacity:1;} 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity:0;} }
          .burst-dot { animation: burstMove 700ms cubic-bezier(.25,.8,.4,1) forwards; }
        `}</style>
      </div>
    )
  }

  // Tier transition overlay implementing anticipation → impact → reward → settle
  const TierTransitionEffects: React.FC = () => {
    if (!transition.type) return null
    const promoted = transition.type === 'promotion'
    const newBadge = BADGES[tier - 1]?.tier ?? `Tier ${tier}`
    return (
  <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Glow pulse */}
          {promoted && !prefersReducedMotion && <div className="absolute inset-0 rounded-full bg-[#38ff7e]/20 animate-glowPulse" />}
          {/* Old badge anticipation squash / demotion fade */}
          <div className={promoted ? (prefersReducedMotion ? 'absolute' : 'absolute animate-anticipation') : (prefersReducedMotion ? 'absolute' : 'absolute animate-demote')}>
            <div className="w-32 h-32 rounded-full bg-muted/40 border border-border flex items-center justify-center text-xs text-muted-foreground">
              {BADGES[(transition.from || 1) - 1]?.tier ?? `Tier ${transition.from}`}
            </div>
          </div>
          {/* New badge impact bounce */}
          <div className={promoted ? (prefersReducedMotion ? 'absolute' : 'absolute animate-impact') : (prefersReducedMotion ? 'absolute' : 'absolute animate-newDemotion')}>
            <div className="relative w-40 h-40 rounded-full bg-card border border-[#ffd700]/40 shadow-[0_0_0_2px_rgba(255,215,0,0.35),0_0_16px_rgba(255,215,0,0.25)] flex items-center justify-center font-semibold text-sm">
              {newBadge}
              {/* Rim light sweep (promotion only) */}
              {promoted && !prefersReducedMotion && <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="block w-full h-full relative">
                  <span className="absolute top-0 left-[-30%] w-[60%] h-full bg-linear-to-r from-transparent via-yellow-300/80 to-transparent animate-rimSweep" />
                </span>
              </span>}
            </div>
          </div>
          {/* Radial burst */}
          {promoted && !prefersReducedMotion && <RadialBurst />}
          {/* Text label */}
          <div className={promoted ? (prefersReducedMotion ? 'absolute bottom-[-70px]' : 'absolute bottom-[-70px] animate-textRise') : (prefersReducedMotion ? 'absolute bottom-[-70px]' : 'absolute bottom-[-70px] animate-textRiseDemote')}>
            <span className={promoted ? 'px-3 py-1 rounded bg-[#38ff7e]/90 text-background text-xs font-medium shadow' : 'px-3 py-1 rounded bg-muted text-muted-foreground text-xs font-medium shadow'}>
              {promoted ? `Promoted to ${newBadge}` : `Demoted to ${newBadge}`}
            </span>
          </div>
          <style>{`
            @keyframes anticipation { 0%{ transform: scale(1);} 70%{ transform: scale(.8,.85);} 100%{ transform: scale(.6,.9); opacity:0;} }
            .animate-anticipation { animation: anticipation 300ms cubic-bezier(.55,.1,.55,.9) forwards; }
            @keyframes impact { 0%{ transform: scale(.2); opacity:0;} 50%{ transform: scale(1.15); opacity:1;} 70%{ transform: scale(.95);} 100%{ transform: scale(1);} }
            .animate-impact { animation: impact 500ms cubic-bezier(.25,.8,.4,1) 300ms forwards; }
            @keyframes rimSweep { 0%{ transform: translateX(0) rotate(25deg); opacity:0;} 20%{ opacity:1;} 100%{ transform: translateX(260%) rotate(25deg); opacity:0;} }
            .animate-rimSweep { animation: rimSweep 800ms ease-in-out 550ms forwards; }
            @keyframes glowPulse { 0%{ opacity:0;} 30%{ opacity:.6;} 60%{ opacity:.3;} 100%{ opacity:.15;} }
            .animate-glowPulse { animation: glowPulse 900ms ease-out 500ms forwards; }
            @keyframes textRise { 0%{ opacity:0; transform: translateY(12px);} 60%{ opacity:1;} 100%{ opacity:1; transform: translateY(-4px);} }
            .animate-textRise { animation: textRise 600ms cubic-bezier(.25,.8,.4,1) 800ms forwards; }
            /* Demotion animations */
            @keyframes demoteOld { 0%{ opacity:1;} 40%{ opacity:.3; transform: translateY(10px);} 100%{ opacity:0; transform: translateY(20px);} }
            .animate-demote { animation: demoteOld 400ms cubic-bezier(.4,.14,.3,1) forwards; }
            @keyframes newDemotion { 0%{ transform: scale(.6) translateY(-8px); opacity:0;} 40%{ opacity:1;} 70%{ transform: scale(1) translateY(0);} 85%{ transform: scale(.98) translateY(0);} 100%{ transform: scale(1) translateY(0);} }
            .animate-newDemotion { animation: newDemotion 600ms cubic-bezier(.25,.8,.4,1) 300ms forwards; }
            @keyframes textRiseDemote { 0%{ opacity:0; transform: translateY(10px);} 60%{ opacity:.9;} 100%{ opacity:.9; transform: translateY(0);} }
            .animate-textRiseDemote { animation: textRiseDemote 500ms ease-out 900ms forwards; }
            /* Reduced motion overrides */
            @media (prefers-reduced-motion: reduce) {
              .burst-dot,
              .animate-impact,
              .animate-anticipation,
              .animate-rimSweep,
              .animate-glowPulse,
              .animate-textRise,
              .animate-demote,
              .animate-newDemotion,
              .animate-textRiseDemote { animation: none !important; }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 px-6 py-8 space-y-6">
        {/* Accessible live region announcing tier changes */}
        <div aria-live="polite" className="sr-only">{liveMessage}</div>
        <Card className="border-none">
          <CardHeader>
            <CardTitle>My Tier</CardTitle>
            <CardDescription>Shows your current tier image and debug controls to simulate XP and override images.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg overflow-hidden flex justify-center ">
                  <Image src={displayImage} alt={`Tier ${tier}`} width={500} height={500} className="object-contain" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Tier {tier} — {BADGES[tier - 1]?.tier ?? `Tier ${tier}`}</h3>
                    <p className="text-sm text-muted-foreground">XP: {xp.toLocaleString()}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">Next: {tier < TIER_COUNT ? (tier * 1000).toLocaleString() + ' XP' : 'Max'}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-md border border-border/40 p-4 bg-card/30">
                  <h4 className="font-medium mb-2">Debug Controls</h4>
                  <div className="space-y-3">
                    <label className="text-xs text-muted-foreground">XP (simulate)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={xp}
                        onChange={(e) => setXp(Math.max(0, Number(e.target.value) || 0))}
                        className="w-28 bg-input border-border p-2 rounded"
                      />
                      <button onClick={() => setXp(x => Math.max(0, x - 1000))} className="px-3 py-1 rounded bg-card text-muted-foreground">-1000</button>
                      <button onClick={() => setXp(x => x + 1000)} className="px-3 py-1 rounded bg-primary text-primary-foreground">+1000</button>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Override image for current tier</label>
                      <select
                        value={currentOverride ?? 'default'}
                        onChange={(e) => setOverrideForTier(tier, e.target.value === 'default' ? null : e.target.value)}
                        className="w-full bg-input border-border p-2 rounded mt-1"
                      >
                        <option value="default">Use default</option>
                        {DEFAULT_IMAGES.map((p, i) => (
                          <option key={p} value={p}>Default tier {i + 1}</option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-2">After advancing tiers, you can set a custom image for that tier.</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Custom image URL</label>
                      <div className="flex gap-2 mt-1">
                        <input type="text" placeholder="https://..." id="customImage" className="flex-1 bg-input border-border p-2 rounded" />
                        <button onClick={() => {
                          const el = document.getElementById('customImage') as HTMLInputElement | null
                          const url = el?.value?.trim()
                          if (url) setOverrideForTier(tier, url)
                        }} className="px-3 py-1 rounded bg-primary text-primary-foreground">Apply</button>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => setOverrideForTier(tier, null)} className="text-sm text-muted-foreground underline">Clear override for this tier</button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border/40 p-4 bg-card/20">
                  <h4 className="font-medium mb-2">Tier gallery</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {DEFAULT_IMAGES.map((p, i) => (
                      <img key={p} src={p} alt={`tier ${i + 1}`} className="w-full h-20 object-cover rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Promotion dialog retained for reward moment (separate from overlay) */}
        {showCongrats && (
          <Dialog open={showCongrats} onOpenChange={(open) => setShowCongrats(open)}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogDescription>You advanced to Tier {tier} — {BADGES[tier - 1]?.tier}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Image src={displayImage} alt={`Tier ${tier}`} width={500} height={500} className="object-contain rounded" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowCongrats(false)} className="px-3 py-1 rounded bg-card text-muted-foreground">Close</button>
              </div>
              <DialogClose />
            </DialogContent>
          </Dialog>
        )}
        {showDemotion && (
          <Dialog open={showDemotion} onOpenChange={(open) => setShowDemotion(open)}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Tier Adjusted</DialogTitle>
                <DialogDescription>You moved to Tier {tier} — {BADGES[tier - 1]?.tier}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Image src={displayImage} alt={`Tier ${tier}`} width={500} height={500} className="object-contain rounded" />
              </div>
              <div className="mt-4 text-xs text-muted-foreground space-y-2">
                <p>This isn't a setback—it's feedback. Review recent decisions and refine your approach.</p>
                <p>You can reclaim the previous tier quickly with focused, high-quality activity.</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowDemotion(false)} className="px-3 py-1 rounded bg-card text-muted-foreground">Got it</button>
              </div>
              <DialogClose />
            </DialogContent>
          </Dialog>
        )}
        {/* Transition effects overlay (promotion/demotion) */}
        <TierTransitionEffects />
      </div>
    </div>
  )
}

export default BadgesPage