import useSWR from "swr"
import { parseAbi, type Address } from "viem"
import { worldClient } from "./balances"
import { PREDICTIONS } from "@/components/PredictionsList"
import { ADDRESS_REGISTRY, ZERO } from "./constants"

const ABI = parseAbi([
  "function market_balance(uint256 market_id) public view returns (uint256 yes, uint256 no)",
])

export const usePositions = (address?: Address) => {
  const { data: positions = [] } = useSWR(
    address ? `positions.${address}` : null,
    async () => {
      if (!address) return []
      const result = await Promise.all(
        PREDICTIONS.map((prediction) =>
          worldClient.readContract({
            abi: ABI,
            address: ADDRESS_REGISTRY,
            account: address,
            functionName: "market_balance",
            args: [BigInt(prediction.id)],
          })
        )
      )

      return result.map((market, i) => {
        const yes = market?.[0] || ZERO
        const no = market?.[1] || ZERO
        return {
          market_id: PREDICTIONS[i].id,
          total: yes + no,
          yes,
          no,
        }
      })
    },
    {
      refreshInterval: 3_000, // 3 seconds
    }
  )

  return { positions }
}
