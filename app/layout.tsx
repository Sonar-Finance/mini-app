import type { Metadata } from "next"
import "@worldcoin/mini-apps-ui-kit-react/styles.css"
import "./globals.css"

import { Toaster as WorldToaster } from "@worldcoin/mini-apps-ui-kit-react"
import { Inter } from "next/font/google"
import { WorldAppProvider } from "@radish-la/world-auth"
import { validateSession } from "@radish-la/world-auth/server"
import MainLayout from "./MainLayout"

const nextFont = Inter({
  subsets: [],
  weight: ["400", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SonarFinance",
  description: "The human-powered prediction market platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nextFont.className} ${nextFont.variable} antialiased`}
      >
        <WorldToaster />
        <WorldAppProvider
          appName="SonarFinance"
          withValidator={validateSession}
        >
          <MainLayout>{children}</MainLayout>
        </WorldAppProvider>
      </body>
    </html>
  )
}
