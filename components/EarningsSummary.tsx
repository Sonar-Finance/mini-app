"use client"

import { Fragment } from "react"

export default function EarningsSummary() {
  return (
    <Fragment>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Earnings</h1>
        <p className="text-sm text-gray-600">Your market performance</p>
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

      {/* Total Positions Card */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="text-sm text-gray-600 mb-3">Total positions</div>
        <div className="flex px-12 justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-xs text-gray-600">YES</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-xs text-gray-600">NO</div>
          </div>
        </div>
      </div>

      {/* Propose Market Button */}
      <button className="w-full bg-sf-blue-dark text-white py-3 px-4 rounded-lg font-semibold hover:bg-sf-blue-dark/90 transition-colors">
        Propose Market
      </button>
    </Fragment>
  )
}
