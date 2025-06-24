"use client"

import { Button } from "@/components/ui/button"
import { Home, Trophy, Users } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "garden", label: "Garden", icon: Home },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "social", label: "Social", icon: Users },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-green-600 shadow-lg font-mono font-bold">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-4 ${
                activeTab === tab.id ? "bg-green-600 text-white" : "text-green-700 hover:bg-green-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
