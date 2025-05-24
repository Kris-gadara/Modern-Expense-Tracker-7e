"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState(theme || "system")
  const [enableAnimations, setEnableAnimations] = useState(true)

  // Update selected theme when theme changes
  useEffect(() => {
    if (theme) {
      setSelectedTheme(theme)
    }
  }, [theme])

  // Update the handleSave function to save theme to localStorage
  const handleSave = () => {
    setTheme(selectedTheme)

    // Save theme preference to localStorage
    localStorage.setItem("theme", selectedTheme)

    // Save animation preference to localStorage
    localStorage.setItem("enableAnimations", enableAnimations.toString())

    toast({
      title: "Settings saved",
      description: `Theme has been updated to ${selectedTheme}.`,
    })
  }

  // Update the useEffect to load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setSelectedTheme(savedTheme)
    } else if (theme) {
      setSelectedTheme(theme)
    }

    const savedPreference = localStorage.getItem("enableAnimations")
    if (savedPreference !== null) {
      setEnableAnimations(savedPreference === "true")
    }
  }, [theme])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Theme Preference</Label>
        <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <RadioGroupItem value="light" id="light" className="peer sr-only" />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Sun className="mb-3 h-6 w-6" />
              Light
            </Label>
          </div>
          <div>
            <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Moon className="mb-3 h-6 w-6" />
              Dark
            </Label>
          </div>
          <div>
            <RadioGroupItem value="system" id="system" className="peer sr-only" />
            <Label
              htmlFor="system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Monitor className="mb-3 h-6 w-6" />
              System
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="enableAnimations">Enable Animations</Label>
          <p className="text-xs text-muted-foreground">Toggle UI animations and transitions</p>
        </div>
        <Switch id="enableAnimations" checked={enableAnimations} onCheckedChange={setEnableAnimations} />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Theme Settings
      </Button>
    </div>
  )
}

