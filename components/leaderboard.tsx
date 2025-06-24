"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Zap, Target } from "lucide-react"

export function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState("gardeners")

  const categories = [
    { id: "gardeners", name: "Top Gardeners", icon: Trophy },
    { id: "stakers", name: "Biggest Stakers", icon: Medal },
    { id: "streaks", name: "Streak Masters", icon: Zap },
    { id: "collectors", name: "Rare Collectors", icon: Award },
  ]

  const leaderboardData = {
    gardeners: [
      { rank: 1, name: "TomatoKing", avatar: "👑", score: 1247, subtitle: "tomatoes harvested" },
      { rank: 2, name: "GreenThumb", avatar: "🌱", score: 1156, subtitle: "tomatoes harvested" },
      { rank: 3, name: "PixelFarmer", avatar: "👨‍🌾", score: 1089, subtitle: "tomatoes harvested" },
      { rank: 4, name: "HarvestMaster", avatar: "🍅", score: 967, subtitle: "tomatoes harvested" },
      { rank: 5, name: "GardenGuru", avatar: "🌿", score: 834, subtitle: "tomatoes harvested" },
      { rank: 42, name: "You", avatar: "😊", score: 23, subtitle: "tomatoes harvested", isUser: true },
    ],
    stakers: [
      { rank: 1, name: "WhaleStaker", avatar: "🐋", score: 50000, subtitle: "STRK staked" },
      { rank: 2, name: "BigBag", avatar: "💰", score: 35000, subtitle: "STRK staked" },
      { rank: 3, name: "DiamondHands", avatar: "💎", score: 28000, subtitle: "STRK staked" },
      { rank: 4, name: "StakeKing", avatar: "👑", score: 22000, subtitle: "STRK staked" },
      { rank: 5, name: "HODLer", avatar: "🚀", score: 18000, subtitle: "STRK staked" },
      { rank: 15, name: "You", avatar: "😊", score: 850, subtitle: "STRK staked", isUser: true },
    ],
    streaks: [
      { rank: 1, name: "DailyGrinder", avatar: "⚡", score: 127, subtitle: "day streak" },
      { rank: 2, name: "Consistent", avatar: "🔥", score: 89, subtitle: "day streak" },
      { rank: 3, name: "NeverMiss", avatar: "🎯", score: 76, subtitle: "day streak" },
      { rank: 4, name: "Dedicated", avatar: "💪", score: 54, subtitle: "day streak" },
      { rank: 5, name: "Reliable", avatar: "⏰", score: 43, subtitle: "day streak" },
      { rank: 8, name: "You", avatar: "😊", score: 5, subtitle: "day streak", isUser: true },
    ],
    collectors: [
      { rank: 1, name: "RareHunter", avatar: "🏆", score: 47, subtitle: "unique NFTs" },
      { rank: 2, name: "Collector", avatar: "🎨", score: 39, subtitle: "unique NFTs" },
      { rank: 3, name: "ArtLover", avatar: "🖼️", score: 34, subtitle: "unique NFTs" },
      { rank: 4, name: "Curator", avatar: "🔍", score: 28, subtitle: "unique NFTs" },
      { rank: 5, name: "Connoisseur", avatar: "🧐", score: 25, subtitle: "unique NFTs" },
      { rank: 23, name: "You", avatar: "😊", score: 7, subtitle: "unique NFTs", isUser: true },
    ],
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-600 bg-yellow-100"
    if (rank === 2) return "text-gray-600 bg-gray-100"
    if (rank === 3) return "text-amber-600 bg-amber-100"
    return "text-blue-600 bg-blue-100"
  }

  return (
    <div className="space-y-6 pt-4 font-mono font-bold">
      <Card className="bg-gradient-to-r from-purple-400 to-pink-500 border-4 border-purple-600">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white flex items-center justify-center space-x-2">
            <Trophy className="w-8 h-8" />
            <span>Leaderboards</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                activeCategory === category.id ? "bg-purple-600 text-white" : "border-2 border-purple-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{category.name}</span>
            </Button>
          )
        })}
      </div>

      {/* Leaderboard List */}
      <Card className="bg-white border-4 border-purple-300">
        <CardContent className="p-4">
          <div className="space-y-3">
            {leaderboardData[activeCategory as keyof typeof leaderboardData].map((player, index) => (
              <div
                key={index}
                className={`
                  flex items-center justify-between p-3 rounded-lg border-2 transition-all
                  ${
                    player.isUser
                      ? "bg-blue-100 border-blue-400 shadow-md"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="secondary"
                    className={`w-12 h-8 flex items-center justify-center font-bold ${getRankColor(player.rank)}`}
                  >
                    {getRankIcon(player.rank)}
                  </Badge>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <div className={`font-semibold ${player.isUser ? "text-blue-800" : "text-gray-800"}`}>
                        {player.name}
                        {player.isUser && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">{player.subtitle}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-purple-700">{player.score.toLocaleString()}</div>
                  {player.rank <= 3 && (
                    <div className="text-xs text-gray-500">
                      {player.rank === 1 ? "Champion" : player.rank === 2 ? "Runner-up" : "3rd Place"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Section */}
      <Card className="bg-gradient-to-r from-orange-200 to-red-200 border-4 border-orange-500">
        <CardContent className="p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-orange-700" />
          <h3 className="font-bold text-orange-800 mb-2">Weekly Challenge</h3>
          <p className="text-sm text-orange-700 mb-3">Harvest 10 tomatoes this week to climb the leaderboard!</p>
          <div className="text-2xl font-bold text-orange-800">3/10 Complete</div>
          <div className="w-full bg-orange-300 rounded-full h-2 mt-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
