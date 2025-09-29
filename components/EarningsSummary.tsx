"use client"

import { Fragment, useState } from "react"
import { Input, useToast } from "@worldcoin/mini-apps-ui-kit-react"
import { MiniKit } from "@worldcoin/minikit-js"

import { executeWorldPayment } from "@/lib/payments"
import { useWorldAuth } from "@radish-la/world-auth"
import { usePositions } from "@/lib/positions"
import { ABI_REGISTRY } from "./PredictionCard"
import { ADDRESS_REGISTRY } from "@/lib/constants"
import ReusableDialog from "./ReusableDialog"

export default function EarningsSummary() {
  const [inputValue, setInputValue] = useState("")
  const { address, signIn } = useWorldAuth()
  const { toast } = useToast()

  const { positions } = usePositions(address)

  async function handleProposeMarket() {
    const PROMPT = inputValue.trim()
    if (!address) return signIn()
    if (!PROMPT) {
      return toast.error({
        title: "Please enter a valid prompt",
      })
    }

    const result = await executeWorldPayment({
      amount: 0.1,
      token: "WLD",
      initiatorAddress: address,
      paymentDescription: `Propose market: ${PROMPT}`,
    })

    if (result) {
      setInputValue("")
      toast.success({
        title: "Market proposal submitted!",
      })
    }
  }

  async function handleClaimEarnings() {
    if (!address) return signIn()
    const claimablePositions = positions.filter(
      (position) => position.total > 0
    )
    if (claimablePositions.length === 0) {
      return toast.error({
        title: "No claimable earnings available",
      })
    }
    const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          abi: ABI_REGISTRY,
          address: ADDRESS_REGISTRY,
          functionName: "claim_balance",
          args: [claimablePositions[0].market_id], // Claiming for the first claimable position
        },
      ],
    })

    if (finalPayload.status === "success") {
      toast.success({
        title: "Earnings claimed successfully!",
      })
    }
  }

  return (
    <Fragment>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Earnings</h1>
          <p className="text-sm text-gray-600">Your market performance</p>
        </div>
        <button
          onClick={handleClaimEarnings}
          className="underline text-sf-blue-dark font-semibold underline-offset-4"
        >
          Claim
        </button>
      </div>

      {/* Earned Balance Card */}
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Earned balance</div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            127.43 WLD
          </div>
          <div className="text-lg text-gray-600">$382.29</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="text-sm text-gray-600 mb-3">Open positions</div>
        <div className="flex px-12 justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {positions.filter((pos) => pos.yes > 0).length}
            </div>
            <div className="text-xs text-gray-600">YES</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {positions.filter((pos) => pos.no > 0).length}
            </div>
            <div className="text-xs text-gray-600">NO</div>
          </div>
        </div>
      </div>

      {/* Propose Market Button */}
      <ReusableDialog
        title="Propose Market"
        onClosePressed={handleProposeMarket}
        closeText="Submit (0.1 WLD)"
        trigger={
          <button className="w-full bg-sf-blue-dark text-white py-3 px-4 rounded-lg font-semibold hover:bg-sf-blue-dark/90 transition-colors">
            Propose Market
          </button>
        }
      >
        <section>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Prompt: What is your market about?"
            variant="floating-label"
          />
          <p className="text-xs mt-2 text-center">
            Earn a fee from the market volume. Market requests are subject to
            approval and require a 0.1 WLD fee.
          </p>
        </section>
      </ReusableDialog>
    </Fragment>
  )
}
