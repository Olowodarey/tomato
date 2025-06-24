"use client"

import { useState } from "react"
import { GardenDashboard } from "@/components/garden-dashboard"
import { StakingModal } from "@/components/staking-modal"
import { HarvestModal } from "@/components/harvest-modal"
import { Leaderboard } from "@/components/leaderboard"
import { SocialFeed } from "@/components/social-feed"
import { Navigation } from "@/components/navigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("garden")
  const [stakingModalOpen, setStakingModalOpen] = useState(false)
  const [harvestModalOpen, setHarvestModalOpen] = useState(false)
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null)

  const handlePlantTomato = (plotIndex: number) => {
    setSelectedPlot(plotIndex)
    setStakingModalOpen(true)
  }

  const handleHarvestTomato = (plotIndex: number) => {
    setSelectedPlot(plotIndex)
    setHarvestModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-600 font-mono font-bold">
      <div className="container mx-auto px-4 pb-20">
        {activeTab === "garden" && (
          <GardenDashboard onPlantTomato={handlePlantTomato} onHarvestTomato={handleHarvestTomato} />
        )}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "social" && <SocialFeed />}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <StakingModal isOpen={stakingModalOpen} onClose={() => setStakingModalOpen(false)} plotIndex={selectedPlot} />

      <HarvestModal isOpen={harvestModalOpen} onClose={() => setHarvestModalOpen(false)} plotIndex={selectedPlot} />
    </div>
  )
}
