import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function noOp() {}

export const beautifyAddress = (addr: string, size = 4, separator = "...") =>
  `${addr.substr(0, size)}${separator}${addr.substr(-size, size)}`

export const generateUUID = () => crypto.randomUUID().replace(/-/g, "")

export const serializeBigint = (v: any): any => {
  return (
    typeof v === "bigint" || typeof v === "number"
      ? v.toString()
      : Array.isArray(v)
      ? v.map(serializeBigint)
      : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v).map(([k, val]) => [k, serializeBigint(val)])
        )
      : v
  ) as any
}

export const appendSignatureResult = (opts?: { slot: number }) =>
  `PERMIT2_SIGNATURE_PLACEHOLDER_${opts?.slot || 0}` as const
