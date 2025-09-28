import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

export default function FixedTopContainer({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <div
      className={cn(
        `h-navigation bg-white top-0 fixed left-0 right-0 z-10`,
        className
      )}
    >
      {children}
    </div>
  )
}
