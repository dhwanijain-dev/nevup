"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

export default function MainOffset({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    try {
      return localStorage.getItem('mainSidebarCollapsed') === 'true'
    } catch {
      return false
    }
  })

  React.useEffect(() => {
    const onToggle = (e: Event) => {
      try {
        const c = (e as CustomEvent).detail?.collapsed
        if (typeof c === 'boolean') {
          setCollapsed(c)
          return
        }
      } catch {}
      try {
        setCollapsed(localStorage.getItem('mainSidebarCollapsed') === 'true')
      } catch {}
    }

    const onStorage = () => {
      try {
        setCollapsed(localStorage.getItem('mainSidebarCollapsed') === 'true')
      } catch {}
    }

    window.addEventListener('mainSidebarToggled', onToggle as EventListener)
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('mainSidebarToggled', onToggle as EventListener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const noOffsetRoutes = new Set(['/login', '/signup', '/forgot-password'])
  const disableOffset = pathname && noOffsetRoutes.has(pathname)
  const mlClass = disableOffset ? 'ml-0' : (collapsed ? 'ml-12' : 'ml-56')

  return (
    <div suppressHydrationWarning className={`${mlClass} transition-all duration-200`}>{children}</div>
  )
}
