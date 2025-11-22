"use client"    
import { Sidebar } from '@/components/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BADGES } from '@/lib/badges'

const BadgesPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 px-6 py-8">
        <Card className="border-border bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Badge Tiers</CardTitle>
            <CardDescription>Understand each badge, its XP requirement, and what it represents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BADGES.map((b) => (
                <div key={b.tier} className="rounded-lg border border-border/60 bg-card/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${b.colorClass}`}
                      style={{ boxShadow: `0 0 0 1px ${b.accent}30, 0 0 4px ${b.accent}50 inset` }}
                    >
                      {b.tier}
                    </span>
                    <span className="text-xs text-muted-foreground">≥ {b.min.toLocaleString()} XP</span>
                  </div>
                  {b.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BadgesPage