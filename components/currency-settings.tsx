"use client"

import { useState } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

export function CurrencySettings() {
  const { state, dispatch } = useExpenseContext()
  const { toast } = useToast()
  const [currency, setCurrency] = useState(state.currency)
  const [showSymbol, setShowSymbol] = useState(true)

  const currencies = [
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  ]

  const handleSave = () => {
    dispatch({
      type: "SET_CURRENCY",
      payload: currency,
    })

    toast({
      title: "Settings saved",
      description: `Currency has been updated to ${currency}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currency">Default Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger id="currency">
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
        <p className="text-xs text-muted-foreground mt-1">
          This will be used as the default currency for all transactions.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="showSymbol">Show Currency Symbol</Label>
          <p className="text-xs text-muted-foreground">
            Display currency symbols (₹, $, €) instead of codes (INR, USD, EUR)
          </p>
        </div>
        <Switch id="showSymbol" checked={showSymbol} onCheckedChange={setShowSymbol} />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Currency Settings
      </Button>
    </div>
  )
}
