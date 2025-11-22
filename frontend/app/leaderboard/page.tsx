"use client"

import { Sidebar } from '@/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { BADGES, getBadge } from '@/lib/badges'
import React from 'react'

interface UserRow {
  id: number
  name: string
  xp: number
  avatar?: string
}

const USERS: UserRow[] = [
  { id: 1, name: 'James Raymond', xp: 18250, avatar: 'https://i.pravatar.cc/56?img=1' },
  { id: 2, name: 'Ava Li', xp: 23400, avatar: 'https://i.pravatar.cc/56?img=2' },
  { id: 3, name: 'Noah Singh', xp: 9050, avatar: 'https://i.pravatar.cc/56?img=3' },
  { id: 4, name: 'Sophia Patel', xp: 5200, avatar: 'https://i.pravatar.cc/56?img=4' },
  { id: 5, name: 'Liam García', xp: 300, avatar: 'https://i.pravatar.cc/56?img=5' },
  { id: 6, name: 'Olivia Chen', xp: 12780, avatar: 'https://i.pravatar.cc/56?img=6' },
  { id: 7, name: 'Ethan Müller', xp: 22050, avatar: 'https://i.pravatar.cc/56?img=7' },
  { id: 8, name: 'Mia Rossi', xp: 7300, avatar: 'https://i.pravatar.cc/56?img=8' },
  { id: 9, name: 'Lucas Novak', xp: 450, avatar: 'https://i.pravatar.cc/56?img=9' },
  { id: 10, name: 'Emma Kowalski', xp: 15100, avatar: 'https://i.pravatar.cc/56?img=10' },
]

// Badge logic moved to shared util @/lib/badges; progress column removed per request.

const LeaderboardPage = () => {
  const sorted = React.useMemo(() => [...USERS].sort((a,b)=> b.xp - a.xp), [])
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 px-6 py-8 space-y-6">
        <Card className="border-border bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Top traders ranked by XP and earning tier badges.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-card/50">
                  <tr className="text-muted-foreground">
                    <th className="py-3 pl-4 pr-2 text-left font-medium">Rank</th>
                    <th className="py-3 px-2 text-left font-medium">User</th>
                    <th className="py-3 px-2 text-left font-medium">XP</th>
                    <th className="py-3 px-2 text-left font-medium">Badge</th>
                    {/* Progress column removed */}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((u, idx) => {
                    const { current } = getBadge(u.xp)
                    return (
                      <tr key={u.id} className={"border-t border-border/40 " + (idx % 2 === 0 ? 'bg-card/30' : 'bg-card/20')}>
                        <td className="py-2 pl-4 pr-2 font-semibold text-foreground">#{idx + 1}</td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 ring-1 ring-border/40">
                              {u.avatar ? <AvatarImage src={u.avatar} alt={u.name} /> : <AvatarFallback>{u.name.slice(0,2).toUpperCase()}</AvatarFallback>}
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground leading-tight">{u.name}</span>
                              <span className="text-xs text-muted-foreground">ID {u.id.toString().padStart(4,'0')}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 font-mono text-primary tabular-nums">{u.xp.toLocaleString()}</td>
                        <td className="py-2 px-2">
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${current.colorClass}`}
                            style={{ boxShadow: `0 0 0 1px ${current.accent}30, 0 0 4px ${current.accent}50 inset` }}
                          >
                            {current.tier}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LeaderboardPage