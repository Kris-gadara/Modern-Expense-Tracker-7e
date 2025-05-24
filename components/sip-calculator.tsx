"use client"

import { useState, useEffect } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function SipCalculator() {
  const { state } = useExpenseContext()
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    totalValue: 0,
  })

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = years * 12

    const totalInvestment = monthlyInvestment * months
    const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    const estimatedReturns = totalValue - totalInvestment

    setResults({
      totalInvestment,
      estimatedReturns,
      totalValue,
    })
  }

  useEffect(() => {
    calculateSIP()
  }, [monthlyInvestment, years, expectedReturn])

  // Generate data for chart
  const generateChartData = () => {
    const data = []

    for (let year = 1; year <= years; year++) {
      const months = year * 12
      const monthlyRate = expectedReturn / 12 / 100

      const invested = monthlyInvestment * months
      const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      const returns = totalValue - invested

      data.push({
        name: `Year ${year}`,
        Invested: invested,
        Returns: returns,
      })
    }

    return data
  }

  const chartData = generateChartData()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="monthlyInvestment">Monthly Investment ({state.currency})</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="monthlyInvestment"
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              min={100}
              step={100}
            />
          </div>
          <Slider
            value={[monthlyInvestment]}
            min={100}
            max={50000}
            step={100}
            onValueChange={(value) => setMonthlyInvestment(value[0])}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years">Investment Period (Years)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>
          <Slider
            value={[years]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setYears(value[0])}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedReturn">Expected Return (%)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="expectedReturn"
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              min={1}
              max={30}
              step={0.5}
            />
          </div>
          <Slider
            value={[expectedReturn]}
            min={1}
            max={30}
            step={0.5}
            onValueChange={(value) => setExpectedReturn(value[0])}
            className="mt-2"
          />
        </div>
      </div>

      <Button onClick={calculateSIP} className="w-full">
        Calculate
      </Button>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Amount Invested</p>
          <p className="text-2xl font-bold">{formatCurrency(results.totalInvestment, state.currency)}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Estimated Returns</p>
          <p className="text-2xl font-bold text-emerald-500">
            {formatCurrency(results.estimatedReturns, state.currency)}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold">{formatCurrency(results.totalValue, state.currency)}</p>
        </div>
      </div>

      <Chart>
        <ChartContainer className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-sm fill-muted-foreground" />
              <YAxis
                className="text-sm fill-muted-foreground"
                tickFormatter={(value) => `${formatCurrency(value, state.currency, false)}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="bg-background border-border"
                    formatter={(value) => [`${formatCurrency(value, state.currency)}`, ""]}
                  />
                }
              />
              <Legend />
              <Bar dataKey="Invested" fill="#4361ee" />
              <Bar dataKey="Returns" fill="#2a9d8f" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}

