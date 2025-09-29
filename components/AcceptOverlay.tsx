"use client"

import Image from "next/image"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import asset_whale from "@/assets/whale.svg"
import asset_bg from "@/assets/bg.webp"

const atomAccepted = atomWithStorage("sf.accepted", false)
export default function AcceptOverlay() {
  const [accepted, setAccepted] = useAtom(atomAccepted)
  if (accepted) return null

  return (
    <div
      style={{
        transition: "opacity 150ms ease-in-out",
        backgroundImage: `url(${asset_bg.src}), url(${asset_bg.blurDataURL})`,
      }}
      className="fixed bg-center inset-0 z-50"
    >
      <div className="absolute p-4 flex text-center flex-col items-center justify-center inset-0 bg-gradient-to-b from-black/75 to-black/90">
        <figure className="w-[25vw]">
          <Image className="w-full" src={asset_whale} alt="" />
        </figure>

        <h1 className="text-white mt-6 text-2xl font-bold">
          Welcome to Sonar Finance
        </h1>

        <p className="text-white/80 text-sm max-w-sm mt-2">
          You're entering a beta of Sonar Finance, the human-powered prediction
          market on Worldchain. Expect bugs as we improve the platform.
        </p>

        <button
          onClick={() => setAccepted(true)}
          className="mt-8 h-14 group px-6 flex gap-4 sm:gap-3 text-white items-center justify-center font-semibold rounded-full border-2 border-white/15 bg-gradient-to-bl from-white/15 to-white/5"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  )
}
