import {
  type Address,
  createPublicClient,
  erc20Abi,
  formatUnits,
  http,
} from "viem"
import useSWR from "swr"
import { worldchain } from "viem/chains"
import { ADDRESS_WORLD_COIN, ZERO } from "./constants"

const worldClient = createPublicClient({
  chain: worldchain,
  transport: http(),
})

export const useWLDBalance = (address?: Address) => {
  const { data = ZERO, ...query } = useSWR(
    address ? `balance.${address}` : null,
    async () => {
      if (!address) return ZERO
      const balance = await worldClient.readContract({
        abi: erc20Abi,
        functionName: "balanceOf",
        address: ADDRESS_WORLD_COIN,
        args: [address],
      })

      return balance ?? ZERO
    }
  )

  return {
    ...query,
    balance: {
      formatted: formatUnits(data, 18),
      value: data,
    },
  }
}
