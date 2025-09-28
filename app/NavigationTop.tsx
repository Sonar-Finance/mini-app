"use client"

import Image from "next/image"
import { useWorldAuth } from "@radish-la/world-auth"

import { getGravatarForAddress } from "@/lib/blo"
import { beautifyAddress } from "@/lib/utils"
import MobileMenu from "./MobileMenu"

import FixedTopContainer from "@/components/FixedTopContainer"

import asset_logo from "@/assets/logo.svg"

export default function NavigationTop() {
  const { address, signIn } = useWorldAuth()

  return (
    <FixedTopContainer className="border-b shrink-0 px-5 flex items-center gap-4">
      <figure className="w-32">
        <Image className="w-full" src={asset_logo} alt="" />
      </figure>

      <MobileMenu
        //enabled={Boolean(address)}
        trigger={
          <button
            onClick={address ? signIn : undefined}
            className="flex items-center gap-2"
          >
            <div className="font-bold pb-0.5 text-right">
              <h2 className="text-sm">
                {address ? beautifyAddress(address) : "Connect"}
              </h2>
              <p className="!-mt-1 text-xs">
                {(0).toLocaleString("en-US")} WLD
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
