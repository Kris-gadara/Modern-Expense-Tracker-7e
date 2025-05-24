"use client"

import { useState } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Moon, Sun, Monitor, DollarSign, Languages, Bell } from "lucide-react"
import { motion } from "framer-motion"

export function ProfilePreferences() {
  const { state, dispatch } = useExpenseContext()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const currencies = [
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  ]

  const handleCurrencyChange = (value: string) => {
    dispatch({
      type: "SET_CURRENCY",
      payload: value,
    })
  }

  const handleThemeChange = (value: string) => {
    setTheme(value)
    localStorage.setItem("theme", value)
  }

  const handleSave = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Preferences saved",
        description: "Your app preferences have been updated successfully.",
      })
    }, 1000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-500" />
          <Label className="text-base font-medium">Currency</Label>
        </div>

        <Select value={state.currency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.symbol} - {currency.name} ({currency.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center gap-2">
          {theme === "dark" ? (
            <Moon className="h-4 w-4 text-blue-500" />
          ) : theme === "light" ? (
            <Sun className="h-4 w-4 text-blue-500" />
          ) : (
            <Monitor className="h-4 w-4 text-blue-500" />
          )}
          <Label className="text-base font-medium">Theme</Label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => handleThemeChange("light")}
            className="w-full justify-start"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>

          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => handleThemeChange("dark")}
            className="w-full justify-start"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>

          <Button
            variant={theme === "system" ? "default" : "outline"}
            size="sm"
            onClick={() => handleThemeChange("system")}
            className="w-full justify-start"
          >
            <Monitor className="mr-2 h-4 w-4" />
            System
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-blue-500" />
          <Label className="text-base font-medium">Language</Label>
        </div>

        <Select defaultValue="en">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={item} className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-500" />
          <Label className="text-base font-medium">Notifications</Label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="budgetAlerts" className="text-sm">
              Budget Alerts
            </Label>
            <Switch id="budgetAlerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="transactionNotifications" className="text-sm">
              Transaction Notifications
            </Label>
            <Switch id="transactionNotifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weeklyReports" className="text-sm">
              Weekly Reports
            </Label>
            <Switch id="weeklyReports" />
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Button onClick={handleSave} className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Preferences"}
        </Button>
      </motion.div>
    </motion.div>
  )
}
