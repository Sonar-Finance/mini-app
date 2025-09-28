"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import { IoStorefront } from "react-icons/io5"
import { FaArrowTrendUp, FaCoins } from "react-icons/fa6"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MAIN_PATH = {
  href: "/",
  value: "home",
  label: "Market",
} as const

export default function NavigationBottom() {
  const pathname = usePathname()

  const ROUTES = {
    home: MAIN_PATH,

    trending: {
      href: "/trending",
      value: "trending",
      label: "Trending",
    },

    earnings: {
      href: "/earnings",
      value: "earnings",
      label: "Earnings",
    },
  } as const

  const activePathValue =
    Object.values(ROUTES).find((route) => {
      return pathname === route.href
    })?.value || MAIN_PATH.value

  return (
    <Tabs value={activePathValue} asChild>
      <TabsList asChild>
        <nav className="border-t shrink-0 [&_a]:shrink-0 z-2 fixed left-0 right-0 bottom-[var(--safe-pb)] !bg-white rounded-none h-auto grid grid-cols-3">
          <NavItem
            route={ROUTES.home}
            icon={<IoStorefront className="text-xl" />}
          />

          <NavItem
            route={ROUTES.trending}
            icon={<FaArrowTrendUp className="text-xl" />}
          />

          <NavItem
            route={ROUTES.earnings}
            icon={<FaCoins className="text-lg" />}
          />
        </nav>
      </TabsList>
    </Tabs>
  )
}

function NavItem({
  icon,
  route,
  onClick,
}: {
  icon: React.ReactNode
  onClick?: () => void
  route: {
    href: string
    value: string
    label: string
  }
}) {
  return (
    <TabsTrigger
      asChild
      onClick={onClick}
      className="grid place-items-center p-1 pt-2 h-14 rounded-none text-black/70 !bg-transparent data-[state=active]:text-sf-blue-dark"
      value={route.value}
    >
      <Link href={route.href}>
        <div className="size-5 grid place-items-center place-content-center">
          {icon}
        </div>
        <span className="text-xs">{route.label}</span>
      </Link>
    </TabsTrigger>
  )
}
