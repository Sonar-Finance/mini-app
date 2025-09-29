"use client"

import Image from "next/image"
import { useWorldAuth } from "@radish-la/world-auth"

import { getGravatarForAddress } from "@/lib/blo"
import { beautifyAddress } from "@/lib/utils"
import MobileMenu from "./MobileMenu"

import FixedTopContainer from "@/components/FixedTopContainer"

import asset_logo from "@/assets/logo.svg"
import { useWLDBalance } from "@/lib/balances"

export default function NavigationTop() {
  const { address, signIn } = useWorldAuth()
  const { balance } = useWLDBalance(address)

  return (
    <FixedTopContainer className="border-b shrink-0 px-5 flex items-center justify-between gap-4">
      <figure className="w-32">
        <Image className="w-full" src={asset_logo} alt="" />
      </figure>

      <MobileMenu
        trigger={
          <button
            onClick={address ? undefined : signIn}
            className="flex items-center gap-2"
          >
            <div className="font-bold pb-0.5 text-right">
              <h2 className="text-sm">
                {address ? beautifyAddress(address, 4, "") : "Connect"}
              </h2>
              <p className="-mt-1 text-green-600 text-xs">
                {Number(balance.formatted).toLocaleString("en-US")} WLD
              </p>
            </div>

            <div
              style={{
                backgroundImage: getGravatarForAddress(address),
              }}
              className="size-9 bg-cover bg-center rounded-lg border-2 border-black/80"
            />
          </button>
        }
      />
    </FixedTopContainer>
  )
}
