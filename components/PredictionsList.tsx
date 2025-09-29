import PredictionCard from "./PredictionCard"

export default function PredictionsList() {
  return (
    <div className="w-full mb-24">
      {PREDICTIONS.map((prediction) => (
        <PredictionCard
          key={`prediction-${prediction.id}`}
          question={prediction.question}
          marketId={BigInt(prediction.id)}
          yesPercentage={prediction.yesPercentage}
          volume={prediction.volume}
          icon={prediction.icon}
        />
      ))}
    </div>
  )
}

export const PREDICTIONS = [
  {
    id: 1,
    question: "Worldchain TVL reaches $1B by end of 2025?",
    yesPercentage: 68,
    volume: "$2m",
    icon: "🌍",
  },
  {
    id: 2,
    question:
      "World ID gets integrated into 3+ major DeFi protocols on Worldchain?",
    yesPercentage: 45,
    volume: "$850k",
    icon: "🔗",
  },
  {
    id: 3,
    question: "Worldchain processes 10M+ transactions in 2025?",
    yesPercentage: 72,
    volume: "$1.2m",
    icon: "⚡",
  },
  {
    id: 4,
    question: "WLD token price above $10 by December 2025?",
    yesPercentage: 35,
    volume: "$3.1m",
    icon: "💎",
  },
  {
    id: 5,
    question: "Worldchain launches native staking rewards?",
    yesPercentage: 58,
    volume: "$1.7m",
    icon: "🏆",
  },
]
