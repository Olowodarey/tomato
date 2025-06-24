"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, Sprout, Trophy, Zap } from "lucide-react"

interface GardenDashboardProps {
  onPlantTomato: (plotIndex: number) => void
  onHarvestTomato: (plotIndex: number) => void
}

interface PlotState {
  status: "empty" | "growing" | "ready" | "withered"
  tomatoType: "seedling" | "sprout" | "vine" | "master"
  progress: number
  stakeAmount: number
  plantedAt?: Date
}

export function GardenDashboard({ onPlantTomato, onHarvestTomato }: GardenDashboardProps) {
  const [plots, setPlots] = useState<PlotState[]>(
    Array(12)
      .fill(null)
      .map((_, i) => ({
        status: i < 3 ? "growing" : i === 3 ? "ready" : "empty",
        tomatoType: "seedling",
        progress: i < 3 ? Math.random() * 100 : i === 3 ? 100 : 0,
        stakeAmount: i < 4 ? 50 + Math.random() * 200 : 0,
        plantedAt: i < 4 ? new Date(Date.now() - Math.random() * 86400000) : undefined,
      })),
  )

  const [userStats, setUserStats] = useState({
    level: 7,
    xp: 1250,
    xpToNext: 1500,
    strkBalance: 2847.5,
    totalStaked: 850,
    tomatoCount: 23,
    harvestStreak: 5,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPlots((prev) =>
        prev.map((plot) => {
          if (plot.status === "growing" && plot.progress < 100) {
            const newProgress = Math.min(100, plot.progress + Math.random() * 2)
            return {
              ...plot,
              progress: newProgress,
              status: newProgress >= 100 ? "ready" : "growing",
            }
          }
          return plot
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTomatoEmoji = (type: string, status: string) => {
    if (status === "empty") return "🌱"
    if (status === "withered") return "🥀"
    if (status === "growing") {
      switch (type) {
        case "master":
          return "✨🍅"
        case "vine":
          return "🍅"
        case "sprout":
          return "🍒"
        default:
          return "🔴"
      }
    }
    if (status === "ready") {
      switch (type) {
        case "master":
          return "🏆🍅"
        case "vine":
          return "🍅✨"
        case "sprout":
          return "🍒"
        default:
          return "🍅"
      }
    }
    return "🌱"
  }

  return (
    <div className="space-y-6 pt-4 font-mono font-bold">
      {/* Header */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-yellow-600 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-2xl border-4 border-white">
                👨‍🌾
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-lg">Level {userStats.level}</span>
                  <Badge variant="secondary" className="bg-white text-orange-600">
                    Gardener
                  </Badge>
                </div>
                <Progress value={(userStats.xp / userStats.xpToNext) * 100} className="w-32 h-2 mt-1" />
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-white font-bold">
                <Coins className="w-5 h-5" />
                <span>{userStats.strkBalance.toFixed(1)} STRK</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-2">
              <div className="text-2xl font-bold text-white">{userStats.tomatoCount}</div>
              <div className="text-xs text-white/80">Tomatoes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <div className="text-2xl font-bold text-white">{userStats.totalStaked}</div>
              <div className="text-xs text-white/80">STRK Staked</div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-300" />
              <div className="text-2xl font-bold text-white">{userStats.harvestStreak}</div>
              <div className="text-xs text-white/80">Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Garden Grid */}
      <Card className="bg-amber-100 border-4 border-amber-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-800 flex items-center space-x-2">
              <Sprout className="w-6 h-6" />
              <span>My Garden</span>
            </h2>
            <Badge variant="outline" className="border-amber-600 text-amber-800">
              12 Plots
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {plots.map((plot, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg border-4 p-3 flex flex-col items-center justify-center
                  transition-all duration-300 cursor-pointer hover:scale-105
                  ${
                    plot.status === "empty"
                      ? "bg-amber-200 border-amber-400 border-dashed"
                      : plot.status === "ready"
                        ? "bg-green-200 border-green-500 animate-pulse"
                        : plot.status === "withered"
                          ? "bg-red-200 border-red-400"
                          : "bg-green-100 border-green-400"
                  }
                `}
                onClick={() => {
                  if (plot.status === "empty") {
                    onPlantTomato(index)
                  } else if (plot.status === "ready") {
                    onHarvestTomato(index)
                  }
                }}
              >
                <div className="text-3xl mb-1">{getTomatoEmoji(plot.tomatoType, plot.status)}</div>

                {plot.status === "growing" && (
                  <div className="w-full">
                    <Progress value={plot.progress} className="h-2 mb-1" />
                    <div className="text-xs text-center text-green-700">{Math.round(plot.progress)}%</div>
                  </div>
                )}

                {plot.status === "ready" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    Harvest!
                  </Button>
                )}

                {plot.status === "empty" && <div className="text-xs text-amber-600 text-center">Tap to Plant</div>}

                {plot.stakeAmount > 0 && <div className="text-xs text-gray-600 mt-1">{plot.stakeAmount} STRK</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-100 border-2 border-blue-400">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">{plots.filter((p) => p.status === "ready").length}</div>
            <div className="text-sm text-blue-600">Ready to Harvest</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 border-2 border-purple-400">
          <CardContent className="p-4 text-center">
            <Sprout className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-800">
              {plots.filter((p) => p.status === "growing").length}
            </div>
            <div className="text-sm text-purple-600">Growing</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
