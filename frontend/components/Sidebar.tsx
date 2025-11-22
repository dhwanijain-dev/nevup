"use client"

import React from "react"
import { BarChart3, Calendar, MessageSquare,CandlestickChart, User, Settings, Mail, HelpCircle,   Trophy, Earth, PanelLeftClose, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Progress } from '@/components/ui/progress';
import { BADGES, getBadge } from '@/lib/badges';

const navItems = [
  { icon: Earth, to: "/dashboard", label: "Dashboard" },
  { icon: BarChart3, to: "/journal", label: "Journal" },
  { icon: MessageSquare, to: "/chat", label: "Chat" },
  { icon: User, to: "/profile", label: "Profile" },
  { icon: CandlestickChart, to: "/trading-arena", label: "Trading Arena" },
  { icon: Trophy, to: "/leaderboard", label: "Leaderboard" },
];

const bottomItems = [
  { icon: Settings, to: "/settings", label: "Settings" },
  { icon: Mail, to: "/contact", label: "Contact" },
  { icon: HelpCircle, to: "/help", label: "Help" },
];

export function Sidebar() {
  const pathname = usePathname() || "/"
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('mainSidebarCollapsed') === 'true'
    } catch {
      return false
    }
  })

  React.useEffect(() => {
    try {
      localStorage.setItem('mainSidebarCollapsed', collapsed ? 'true' : 'false')
    } catch {}
  }, [collapsed])

  const [xp, setXp] = React.useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const stored = localStorage.getItem('userXP')
    return stored ? parseInt(stored, 10) : 5200 // default demo XP
  })

  // Allow external updates (in future maybe from context); listen to custom event
  React.useEffect(() => {
    function handler(e: any) {
      if (e?.detail?.xp != null) setXp(e.detail.xp)
    }
    window.addEventListener('userXPUpdated', handler)
    return () => window.removeEventListener('userXPUpdated', handler)
  }, [])

  React.useEffect(() => {
    try { localStorage.setItem('userXP', xp.toString()) } catch {}
  }, [xp])

  const badgeInfo = getBadge(xp)
  const nextBadge = badgeInfo.nextThreshold ? BADGES.find(b => b.min === badgeInfo.nextThreshold) : null

  const toggleSidebar = () => {
    const next = !collapsed
    setCollapsed(next)
    try {
      localStorage.setItem('mainSidebarCollapsed', next ? 'true' : 'false')
    } catch {}
    try {
      window.dispatchEvent(new CustomEvent('mainSidebarToggled', { detail: { collapsed: next } }))
    } catch {}
  }

  return (
    <aside suppressHydrationWarning className={"fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border flex flex-col py-6 transition-all duration-200 " + (collapsed ? 'w-16' : 'w-56')}>
      {/* Header with Logo, Brand Name, and Collapse Button */}
      <div className={cn(
        "flex items-center mb-8 px-3 gap-3",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <Image src="/assets/nevuplogo.png" className={cn("", collapsed ? "ml-20 ": "")} alt="Logo" width={24} height={24} />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-foreground whitespace-nowrap">
              Nevup
            </span>
          )}
        </div>
        <button
          suppressHydrationWarning
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={toggleSidebar}
          className={cn(
            "p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-foreground transition-colors shrink-0",
            collapsed && "ml-0"
          )}
        >
          {collapsed ? (
            <PanelLeft className=" ml-10 w-4 h-4" />
          ) : (
            <PanelLeftClose className=" w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.to || pathname.startsWith(item.to + "/")
          return (
            <Link
              key={item.to}
              href={item.to}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                "w-full h-12 rounded-lg flex items-center transition-all duration-200 relative",
                collapsed ? "justify-center" : "justify-start pl-3",
                "hover:bg-sidebar-accent",
                isActive ? "bg-sidebar-accent" : ""
              )}
            >
              <span
                className={cn(
                  "p-2 rounded-md flex items-center justify-center transition-all",
                  isActive ? "text-[#38ff7e]" : "text-sidebar-foreground/60",
                  collapsed ? 'p-1 rounded-sm' : ''
                )}
              >
                <item.icon  suppressHydrationWarning className={cn("w-5 h-5 transition-all", collapsed ? 'w-4 h-4' : 'w-5 h-5')} />
              </span>
              <span className={cn(
                "ml-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                collapsed ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-2 w-full px-3 border-t border-sidebar-border pt-4">
        {bottomItems.map((item) => {
          const isActive = pathname === item.to || pathname.startsWith(item.to + "/")
          return (
            <Link
              key={item.to}
              href={item.to}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                "w-full h-12 rounded-lg flex items-center transition-all duration-200",
                collapsed ? "justify-center" : "justify-start pl-3",
                "hover:bg-sidebar-accent",
                isActive ? "bg-sidebar-accent" : ""
              )}
            >
              <span
                className={cn(
                  "p-2 rounded-md flex items-center justify-center transition-all",
                  isActive ? "text-[#38ff7e]" : "text-sidebar-foreground/60",
                  collapsed ? 'p-1 rounded-sm' : ''
                )}
              >
                <item.icon suppressHydrationWarning className={cn("w-5 h-5 transition-all", collapsed ? 'w-4 h-4' : 'w-5 h-5')} />
              </span>
              <span className={cn(
                "ml-3 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                collapsed ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
      {!collapsed && (
        <Link href="/badges" className="relative w-full">

        <div className="w-full px-3 mt-4 hover:scale-105 transition-transform">
          <div className="border border-sidebar-border rounded-md p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">XP Progress</span>
              <span className="text-[10px] text-muted-foreground tabular-nums">{xp.toLocaleString()} XP</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-foreground">{badgeInfo.current.tier}</span>
              {nextBadge ? (
                <span className="text-muted-foreground">{xp}/{nextBadge.min}</span>
              ) : (
                <span className="text-muted-foreground">Max</span>
              )}
            </div>
            <Progress value={badgeInfo.progressToNext} className="h-2" />
            {nextBadge ? (
              <p className="text-[10px] text-muted-foreground">Next: {nextBadge.tier} at {nextBadge.min.toLocaleString()} XP</p>
            ) : (
              <p className="text-[10px] text-muted-foreground">Top tier achieved</p>
            )}
          </div>
        </div>
        </Link>
      )}
      {/* Collapse button moved to header, removing bottom button */}
    </aside>
  )
}
