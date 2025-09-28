import { blo } from "blo"

export const getGravatarForAddress = (address?: string) => {
  return `url(${blo(
    address?.startsWith("0x")
      ? (address as any)
      : `0x${address || DEFAULT_ADDRESS}`
  )})`
}

const DEFAULT_ADDRESS = "FFFAAAA000"
