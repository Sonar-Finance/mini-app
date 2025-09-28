"use client"

import { useToast } from "@worldcoin/mini-apps-ui-kit-react"
import ReusableDialog from "./ReusableDialog"

interface PredictionCardProps {
  question: string
  yesPercentage: number
  volume: string
  icon: string
}

export default function PredictionCard({
  question,
  yesPercentage,
  volume,
  icon,
}: PredictionCardProps) {
  const { toast } = useToast()

  return (
    <div className="bg-white rounded-lg border p-4 mb-3">
      <div className="flex items-start justify-between mb-4">
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
          onClosePressed={() =>
            toast.success({
              title: "Voted YES",
            })
          }
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
          onClosePressed={() =>
            toast.error({
              title: "Voted NO",
            })
          }
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
