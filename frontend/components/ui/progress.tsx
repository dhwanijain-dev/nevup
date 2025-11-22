"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { value?: number }) {
  const [internalValue, setInternalValue] = React.useState(0)

  // Animate from 0 to target value on mount / value change
  React.useEffect(() => {
    // small timeout to allow initial paint then animate
    const t = requestAnimationFrame(() => setInternalValue(value))
    return () => cancelAnimationFrame(t)
  }, [value])

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-[#38ff7e]/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full origin-left bg-[#38ff7e] transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${100 - internalValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
