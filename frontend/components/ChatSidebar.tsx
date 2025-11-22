"use client"

import React from "react"
import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Props = {
  recent?: string[]
}

export default function ChatSidebar({ recent = [] }: Props) {
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('chatSidebarCollapsed') === 'true'
    } catch {
      return false
    }
  })

  React.useEffect(() => {
    try {
      localStorage.setItem('chatSidebarCollapsed', collapsed ? 'true' : 'false')
    } catch {}
  }, [collapsed])

  return (
    <aside className={"shrink-0 h-full bg-card border-r border-border p-4 transition-all " + (collapsed ? 'w-20' : 'w-64')}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          {!collapsed ? (
            <h2 className="text-lg font-semibold">Chats</h2>
          ) : (
            <div className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold">C</div>
          )}
          <button
            aria-label={collapsed ? 'Expand chat sidebar' : 'Collapse chat sidebar'}
            onClick={() => setCollapsed(!collapsed)}
            className="text-sm text-muted-foreground p-1 rounded hover:bg-sidebar-accent"
          >
            {collapsed ? '>' : '<'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!collapsed ? (
            <div>
              <div className="mb-3 text-sm text-muted-foreground">Recent</div>
              <div className="space-y-2">
                {recent.length > 0 ? (
                  recent.map((r) => (
                    <button key={r} className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{r}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No recent chats</div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <Button size="icon" className="bg-card border-border">
                <Plus className="w-4 h-4" />
              </Button>
              {recent.slice(0, 5).map((r, i) => (
                <div key={i} className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">{r.charAt(0)}</div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-primary-foreground">ME</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1">
                <div className="text-sm font-medium">You</div>
                <div className="text-xs text-muted-foreground">Free • Pro trial</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
