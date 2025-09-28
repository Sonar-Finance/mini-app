"use client"

import { useWorldAuth } from "@radish-la/world-auth"
import { useHiScoreAtom } from "@/lib/jotai"

import { getGravatarForAddress } from "@/lib/blo"
import { beautifyAddress } from "@/lib/utils"
import MobileMenu from "./MobileMenu"

export default function Home() {
  const [score] = useHiScoreAtom()
  const { address, signIn } = useWorldAuth()

  return (
    <main className="min-h-screen">
      <div className="fixed p-2 z-[2] inset-x-0 top-0 flex items-center">
        <MobileMenu
          //enabled={Boolean(address)}
          trigger={
            <button
              onClick={address ? signIn : undefined}
              className="flex items-center gap-2"
            >
              <div
                style={{
                  backgroundImage: getGravatarForAddress(address),
                }}
                className="size-9 bg-cover bg-center rounded-lg border-2 border-black/80"
              />

              <div className="font-bold pb-0.5 text-left text-white">
                <h2>{address ? beautifyAddress(address) : "Connect"}</h2>
                <h3 className="-mt-1 text-sm">
                  {score.toLocaleString("en-US")} WLD
                </h3>
              </div>
            </button>
          }
        />
      </div>
    </main>
  )
}
