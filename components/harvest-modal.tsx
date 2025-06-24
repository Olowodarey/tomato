"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Share2, Trophy } from "lucide-react"

interface HarvestModalProps {
  isOpen: boolean
  onClose: () => void
  plotIndex: number | null
}

export function HarvestModal({ isOpen, onClose, plotIndex }: HarvestModalProps) {
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [showRewards, setShowRewards] = useState(false)

  const harvestData = {
    tomatoType: "Vine Heirloom",
    rarity: "Rare",
    emoji: "🍅✨",
    rewards: {
      strk: 125.5,
      xp: 250,
      nftId: "#TOM-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
    },
    traits: ["Shiny", "Oversized", "Perfect Shape"],
  }

  useEffect(() => {
    if (isOpen) {
      setIsHarvesting(false)
      setShowRewards(false)
    }
  }, [isOpen])

  const handleHarvest = () => {
    setIsHarvesting(true)

    // Simulate harvest animation
    setTimeout(() => {
      setIsHarvesting(false)
      setShowRewards(true)
    }, 2000)
  }

  const handleShare = () => {
    // Simulate sharing
    console.log("Sharing harvest to social media")
  }

  if (isHarvesting) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto bg-gradient-to-b from-yellow-200 to-orange-200 border-4 border-orange-500 font-mono font-bold">
          <div className="text-center py-8">
            <div className="text-8xl animate-bounce mb-4">🍅</div>
            <div className="text-2xl font-bold text-orange-800 mb-2">Harvesting...</div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (showRewards) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm mx-auto bg-gradient-to-b from-purple-200 to-pink-200 border-4 border-purple-500 font-mono font-bold">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="text-8xl mb-4 animate-pulse">{harvestData.emoji}</div>
              <Sparkles className="absolute top-0 right-1/3 w-6 h-6 text-yellow-500 animate-spin" />
              <Sparkles className="absolute bottom-4 left-1/3 w-4 h-4 text-pink-500 animate-ping" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Harvest Complete!</h2>
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {harvestData.rarity} NFT
              </Badge>
            </div>

            {/* NFT Card */}
            <Card className="bg-gradient-to-b from-white to-purple-100 border-4 border-purple-400">
              <CardContent className="p-4">
                <div className="text-6xl mb-2">{harvestData.emoji}</div>
                <h3 className="font-bold text-purple-800">{harvestData.tomatoType}</h3>
                <p className="text-sm text-purple-600 mb-2">{harvestData.rewards.nftId}</p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {harvestData.traits.map((trait, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card className="bg-green-100 border-2 border-green-400">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Rewards Earned</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>STRK Tokens:</span>
                    <span className="font-bold text-green-700">+{harvestData.rewards.strk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-bold text-blue-700">+{harvestData.rewards.xp} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NFT Minted:</span>
                    <span className="font-bold text-purple-700">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleShare} className="flex-1 border-2 border-blue-400 text-blue-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={onClose} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                Awesome! 🎉
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-gradient-to-b from-green-200 to-yellow-200 border-4 border-green-600 font-mono font-bold">
        <div className="text-center space-y-6">
          <div className="text-8xl animate-pulse">🍅</div>

          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Ready to Harvest!</h2>
            <p className="text-green-700">Your tomato has fully grown and is ready to be harvested as an NFT.</p>
          </div>

          <Card className="bg-white/50 border-2 border-green-400">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-800 mb-2">Expected Rewards</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>STRK Tokens:</span>
                  <span className="font-semibold">~{harvestData.rewards.strk}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-semibold">+{harvestData.rewards.xp} XP</span>
                </div>
                <div className="flex justify-between">
                  <span>NFT Rarity:</span>
                  <span className="font-semibold">{harvestData.rarity}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-2 border-gray-400">
              Cancel
            </Button>
            <Button onClick={handleHarvest} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold">
              Harvest Now! 🌟
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
