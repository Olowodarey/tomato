"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Clock, Zap } from "lucide-react"

interface StakingModalProps {
  isOpen: boolean
  onClose: () => void
  plotIndex: number | null
}

export function StakingModal({ isOpen, onClose, plotIndex }: StakingModalProps) {
  const [stakeAmount, setStakeAmount] = useState([50])

  const getTomatoTier = (amount: number) => {
    if (amount >= 500) return { name: "Master", color: "gold", time: "6h", emoji: "🏆🍅", multiplier: "3x" }
    if (amount >= 201) return { name: "Vine", color: "purple", time: "12h", emoji: "🍅✨", multiplier: "2x" }
    if (amount >= 51) return { name: "Sprout", color: "green", time: "18h", emoji: "🍒", multiplier: "1.5x" }
    return { name: "Seedling", color: "red", time: "24h", emoji: "🔴", multiplier: "1x" }
  }

  const currentTier = getTomatoTier(stakeAmount[0])
  const estimatedReward = stakeAmount[0] * 0.1 * Number.parseFloat(currentTier.multiplier)

  const handleStake = () => {
    // Simulate staking transaction
    console.log(`Staking ${stakeAmount[0]} STRK on plot ${plotIndex}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-gradient-to-b from-green-100 to-green-200 border-4 border-green-600 font-mono font-bold">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-800 flex items-center justify-center space-x-2">
            <span>🌱</span>
            <span>Plant Tomato</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stake Amount Selector */}
          <div className="space-y-4">
            <div className="text-center">
              <label className="text-lg font-semibold text-green-800">Stake Amount</label>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                <Input
                  type="number"
                  value={stakeAmount[0]}
                  onChange={(e) => setStakeAmount([Number.parseInt(e.target.value) || 0])}
                  className="w-24 text-center font-bold"
                  min="10"
                  max="1000"
                />
                <span className="font-semibold text-green-800">STRK</span>
              </div>
            </div>

            <Slider
              value={stakeAmount}
              onValueChange={setStakeAmount}
              max={1000}
              min={10}
              step={10}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-green-700">
              <span>10 STRK</span>
              <span>1000 STRK</span>
            </div>
          </div>

          {/* Tomato Preview */}
          <Card
            className={`border-4 ${
              currentTier.color === "gold"
                ? "border-yellow-500 bg-yellow-100"
                : currentTier.color === "purple"
                  ? "border-purple-500 bg-purple-100"
                  : currentTier.color === "green"
                    ? "border-green-500 bg-green-100"
                    : "border-red-500 bg-red-100"
            }`}
          >
            <CardContent className="p-4 text-center">
              <div className="text-6xl mb-2">{currentTier.emoji}</div>
              <Badge variant="secondary" className="mb-2">
                {currentTier.name} Tier
              </Badge>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentTier.time}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>{currentTier.multiplier}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Estimate */}
          <Card className="bg-blue-100 border-2 border-blue-400">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Estimated Rewards</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Reward:</span>
                  <span className="font-semibold">{(stakeAmount[0] * 0.1).toFixed(1)} STRK</span>
                </div>
                <div className="flex justify-between">
                  <span>Tier Multiplier:</span>
                  <span className="font-semibold">{currentTier.multiplier}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-blue-800">
                  <span>Total Reward:</span>
                  <span>{estimatedReward.toFixed(1)} STRK</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-2 border-gray-400">
              Cancel
            </Button>
            <Button onClick={handleStake} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold">
              Plant Tomato! 🍅
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
