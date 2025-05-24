"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Camera, Mail, MapPin, Calendar } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ProfileHeader() {
  const { theme } = useTheme()
  const [avatarHovered, setAvatarHovered] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="relative overflow-hidden border-none shadow-lg">
        {/* Cover Image */}
        <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 rounded-full opacity-80 hover:opacity-100"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 pt-0 md:px-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
            >
              <motion.div
                className="perspective-avatar"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    RK
                  </AvatarFallback>
                </Avatar>

                {/* Animated ring around avatar */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-500/50"
                  animate={avatarHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 2, repeat: avatarHovered ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                />
              </motion.div>

              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="space-y-2 pt-2 md:pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h2 className="text-2xl md:text-3xl font-bold">Rahul Kumar</h2>
                <Badge
                  variant="outline"
                  className="w-fit bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                >
                  Premium User
                </Badge>
              </div>

              <p className="text-muted-foreground">Financial enthusiast focused on smart saving and investing</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>rahul.kumar@example.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined April 2023</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-end items-start pt-0 md:pt-6">
              <Button>Edit Profile</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
