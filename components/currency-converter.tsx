"use client"

import { useState, useEffect } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, RefreshCw } from "lucide-react"

export function CurrencyConverter() {
  const { state, dispatch } = useExpenseContext()
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState(state.currency)
  const [toCurrency, setToCurrency] = useState(state.currency === "USD" ? "EUR" : "USD")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
  ]

  // Update the exchange rates to be more accurate and add more currencies
  // Mock exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    INR: {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095,
      JPY: 1.81,
      CAD: 0.016,
      AUD: 0.018,
      CHF: 0.011,
      CNY: 0.087,
      BRL: 0.061,
      INR: 1,
    },
    USD: {
      INR: 83.12,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 150.2,
      CAD: 1.35,
      AUD: 1.52,
      CHF: 0.89,
      CNY: 7.24,
      BRL: 5.05,
      USD: 1,
    },
    EUR: {
      INR: 90.45,
      USD: 1.09,
      GBP: 0.86,
      JPY: 163.5,
      CAD: 1.47,
      AUD: 1.65,
      CHF: 0.97,
      CNY: 7.88,
      BRL: 5.5,
      EUR: 1,
    },
    GBP: {
      INR: 105.2,
      USD: 1.27,
      EUR: 1.16,
      JPY: 190.1,
      CAD: 1.71,
      AUD: 1.92,
      CHF: 1.13,
      CNY: 9.17,
      BRL: 6.39,
      GBP: 1,
    },
    JPY: {
      INR: 0.55,
      USD: 0.0067,
      EUR: 0.0061,
      GBP: 0.0053,
      CAD: 0.009,
      AUD: 0.01,
      CHF: 0.0059,
      CNY: 0.048,
      BRL: 0.034,
      JPY: 1,
    },
    CAD: {
      INR: 61.57,
      USD: 0.74,
      EUR: 0.68,
      GBP: 0.58,
      JPY: 111.3,
      AUD: 1.13,
      CHF: 0.66,
      CNY: 5.36,
      BRL: 3.74,
      CAD: 1,
    },
    AUD: {
      INR: 54.69,
      USD: 0.66,
      EUR: 0.61,
      GBP: 0.52,
      JPY: 98.8,
      CAD: 0.89,
      CHF: 0.59,
      CNY: 4.76,
      BRL: 3.32,
      AUD: 1,
    },
    CHF: {
      INR: 93.39,
      USD: 1.12,
      EUR: 1.03,
      GBP: 0.89,
      JPY: 168.8,
      CAD: 1.52,
      AUD: 1.71,
      CNY: 8.13,
      BRL: 5.67,
      CHF: 1,
    },
    CNY: {
      INR: 11.48,
      USD: 0.14,
      EUR: 0.13,
      GBP: 0.11,
      JPY: 20.75,
      CAD: 0.19,
      AUD: 0.21,
      CHF: 0.12,
      BRL: 0.7,
      CNY: 1,
    },
    BRL: {
      INR: 16.46,
      USD: 0.2,
      EUR: 0.18,
      GBP: 0.16,
      JPY: 29.74,
      CAD: 0.27,
      AUD: 0.3,
      CHF: 0.18,
      CNY: 1.43,
      BRL: 1,
    },
  }

  const convertCurrency = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const rate = exchangeRates[fromCurrency][toCurrency]
      const convertedAmount = Number.parseFloat(amount) * rate
      setResult(convertedAmount.toFixed(2))
      setLoading(false)
    }, 500)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const setAppCurrency = () => {
    dispatch({
      type: "SET_CURRENCY",
      payload: fromCurrency,
    })
  }

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency()
    }
  }, [fromCurrency, toCurrency])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="fromCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon" className="h-10 w-10" onClick={swapCurrencies}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="toCurrency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="toCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={convertCurrency} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert"
          )}
        </Button>
      </div>

      {result && (
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Result</p>
          <p className="text-2xl font-bold">
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
          </p>
        </div>
      )}

      <div className="border-t border-border pt-4">
        <p className="text-sm text-muted-foreground mb-2">App Currency</p>
        <div className="flex items-center justify-between">
          <p>
            Current: <span className="font-medium">{state.currency}</span>
          </p>
          <Button variant="outline" onClick={setAppCurrency} disabled={fromCurrency === state.currency}>
            Set {fromCurrency} as App Currency
          </Button>
        </div>
      </div>
    </div>
  )
}
