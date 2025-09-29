"use client"

import { useToast } from "@worldcoin/mini-apps-ui-kit-react"
import ReusableDialog from "./ReusableDialog"
import { useWorldAuth } from "@radish-la/world-auth"
import {
  ADDRESS_REGISTRY,
  ADDRESS_WORLD_COIN,
  ONE_HOUR_IN_BLOCK_TIME,
} from "@/lib/constants"
import { MiniKit } from "@worldcoin/minikit-js"
import { ContractFunctionArgs, parseAbi, parseEther } from "viem"
import { appendSignatureResult } from "@/lib/utils"

const ENUM_VOTES = {
  YES: 0,
  NO: 1,
}

export const ABI_REGISTRY = parseAbi([
  // function vote_with_signature(uint256 market_id, Votes vote, uint256 amount, ISignatureTransfer.PermitTransferFrom calldata permit0, ISignatureTransfer.SignatureTransferDetails calldata details0, bytes calldata sig0)
  "function vote_with_signature(uint256, uint8, uint256, ((address,uint256),uint256,uint256), (address,uint256), bytes)",
  "function claim_balance(uint256 market_id) external",
])

const AMOUNT = parseEther("0.25") // 0.25 WLD per vote
export default function PredictionCard({
  question,
  yesPercentage,
  marketId,
  volume,
  icon,
}: {
  question: string
  yesPercentage: number
  marketId: bigint
  volume: string
  icon: string
}) {
  const { toast } = useToast()
  const { address, signIn } = useWorldAuth()

  async function handleCastVote({ isVotingYes }: { isVotingYes: boolean }) {
    if (!address) return signIn()

    const nonce = BigInt(Date.now())

    const DEADLINE = BigInt(
      Math.floor(Date.now() / 1000) + ONE_HOUR_IN_BLOCK_TIME
    )

    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          abi: ABI_REGISTRY,
          address: ADDRESS_REGISTRY,
          functionName: "vote_with_signature",
          args: [
            marketId,
            isVotingYes ? ENUM_VOTES.YES : ENUM_VOTES.NO,
            AMOUNT,
            [[ADDRESS_WORLD_COIN, AMOUNT], nonce, DEADLINE], // token, amount, nonce, deadline
            [ADDRESS_REGISTRY, AMOUNT], // to, requested
            appendSignatureResult({ slot: 0 }) as any,
          ] satisfies ContractFunctionArgs<typeof ABI_REGISTRY>,
        },
      ],
      permit2: [
        {
          spender: ADDRESS_REGISTRY,
          permitted: {
            token: ADDRESS_WORLD_COIN,
            amount: AMOUNT,
          },
          nonce: nonce,
          deadline: DEADLINE,
        },
      ],
    })

    const isError = Boolean((finalPayload as any)?.details?.debugUrl)
    console.debug({ finalPayload })
    if (isError) {
      return toast.error({
        title: "Transaction failed",
      })
    }

    if (finalPayload.status === "success") {
      toast.success({
        title: isVotingYes ? "Voted YES" : "Voted NO",
      })
    }
  }

  return (
    <div className="bg-white rounded-lg border p-4 mb-3">
      <div className="flex gap-3 items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-sm leading-tight">
              {question}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            {yesPercentage}%
          </div>
          <div className="text-xs text-gray-500">chance</div>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <ReusableDialog
          title="Voting YES"
          onClosePressed={() => handleCastVote({ isVotingYes: true })}
          closeText="Yes (0.25WLD)"
          trigger={
            <button className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium text-sm hover:bg-green-200 transition-colors">
              Yes
            </button>
          }
        >
          <p>{question}</p>
        </ReusableDialog>

        <ReusableDialog
          title="Voting NO"
          closeText="No (0.25WLD)"
          onClosePressed={() => handleCastVote({ isVotingYes: false })}
          trigger={
            <button className="flex-1 bg-red-100 text-red-800 py-2 px-4 rounded-lg font-medium text-sm hover:bg-red-200 transition-colors">
              No
            </button>
          }
        >
          <p>{question}</p>
        </ReusableDialog>
      </div>

      <div className="text-sm text-gray-600">{volume} Vol.</div>
    </div>
  )
}
