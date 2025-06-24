"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Users, Gift } from "lucide-react"

export function SocialFeed() {
  const feedItems = [
    {
      id: 1,
      user: { name: "GreenThumb", avatar: "🌱", level: 12 },
      action: "harvested",
      item: "Golden Master Tomato",
      emoji: "🏆🍅",
      rarity: "Legendary",
      timestamp: "2 hours ago",
      likes: 23,
      comments: 5,
      image: true,
    },
    {
      id: 2,
      user: { name: "PixelFarmer", avatar: "👨‍🌾", level: 8 },
      action: "achieved",
      item: "50-day harvest streak",
      emoji: "🔥",
      rarity: "Achievement",
      timestamp: "4 hours ago",
      likes: 18,
      comments: 3,
      image: false,
    },
    {
      id: 3,
      user: { name: "TomatoQueen", avatar: "👑", level: 15 },
      action: "planted",
      item: "5 Master tier tomatoes",
      emoji: "✨🍅",
      rarity: "Epic",
      timestamp: "6 hours ago",
      likes: 31,
      comments: 8,
      image: true,
    },
    {
      id: 4,
      user: { name: "HarvestKing", avatar: "🍅", level: 10 },
      action: "reached",
      item: "Level 10 Gardener",
      emoji: "🎉",
      rarity: "Milestone",
      timestamp: "1 day ago",
      likes: 42,
      comments: 12,
      image: false,
    },
  ]

  const friends = [
    { name: "GreenThumb", avatar: "🌱", status: "online", tomatoes: 156 },
    { name: "PixelFarmer", avatar: "👨‍🌾", status: "harvesting", tomatoes: 89 },
    { name: "TomatoQueen", avatar: "👑", status: "offline", tomatoes: 234 },
    { name: "HarvestKing", avatar: "🍅", status: "online", tomatoes: 123 },
  ]

  return (
    <div className="space-y-6 pt-4 font-mono font-bold">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-400 to-purple-500 border-4 border-pink-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">Social Garden</span>
            </div>
            <Badge variant="secondary" className="bg-white text-pink-600">
              {friends.filter((f) => f.status === "online").length} friends online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Friends Bar */}
      <Card className="bg-blue-100 border-2 border-blue-400">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-3">Friends' Gardens</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {friends.map((friend, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl border-4 border-blue-300 mb-1">
                    {friend.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      friend.status === "online"
                        ? "bg-green-500"
                        : friend.status === "harvesting"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="text-xs font-semibold text-blue-800">{friend.name}</div>
                <div className="text-xs text-blue-600">{friend.tomatoes} 🍅</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <div className="space-y-4">
        {feedItems.map((item) => (
          <Card key={item.id} className="bg-white border-2 border-gray-300 hover:border-purple-300 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg border-2 border-purple-300">
                    {item.user.avatar}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-800">{item.user.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Lv.{item.user.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.timestamp}</span>
                  </div>

                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">{item.action}</span> {item.item}
                  </p>

                  {item.image && (
                    <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg p-4 mb-3 border-2 border-green-300">
                      <div className="text-center">
                        <div className="text-6xl mb-2">{item.emoji}</div>
                        <Badge
                          variant="secondary"
                          className={`${
                            item.rarity === "Legendary"
                              ? "bg-yellow-500 text-white"
                              : item.rarity === "Epic"
                                ? "bg-purple-500 text-white"
                                : "bg-blue-500 text-white"
                          }`}
                        >
                          {item.rarity}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gift Section */}
      <Card className="bg-gradient-to-r from-yellow-200 to-orange-200 border-4 border-yellow-500">
        <CardContent className="p-4 text-center">
          <Gift className="w-8 h-8 mx-auto mb-2 text-yellow-700" />
          <h3 className="font-bold text-yellow-800 mb-2">Send Tomato Gifts</h3>
          <p className="text-sm text-yellow-700 mb-3">Share the harvest joy with your friends!</p>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Send Gift 🎁</Button>
        </CardContent>
      </Card>
    </div>
  )
}
