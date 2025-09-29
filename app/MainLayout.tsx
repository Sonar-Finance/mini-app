"use client"

import type { PropsWithChildren } from "react"
import dynamic from "next/dynamic"
import NavigationBottom from "./NavigationBottom"

const NavigationTop = dynamic(() => import("./NavigationTop"), { ssr: false })
const AcceptOverlay = dynamic(() => import("@/components/AcceptOverlay"), {
  ssr: false,
})

const ErudaProvider = dynamic(
  () => import("@/components/Eruda").then((r) => r.ErudaProvider),
  {
    ssr: false,
  }
)

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white w-full max-w-2xl mx-auto">
      <AcceptOverlay />
      <NavigationTop />
      <ErudaProvider />
      <div className="[&_main]:overflow-auto h-full [&_main]:pt-[5.5rem] [&_main]:pb-[4.5rem] [&_main]:max-h-[calc(100dvh-var(--safe-pb))]">
        {children}
      </div>
      <NavigationBottom />
    </div>
  )
}
