"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { BarChart3, TrendingUp, TrendingDown, PieChart } from "lucide-react"

export function InvestmentSummary() {
  // Mock data - in a real app, this would come from your investments state
  const investments = [
    { id: 1, name: "HDFC Mutual Fund", type: "mutual_fund", amount: 50000, returns: 12, currency: "INR" },
    { id: 2, name: "Reliance ETF", type: "etf", amount: 25000, returns: 8, currency: "INR" },
    { id: 3, name: "Tata Digital India Fund", type: "mutual_fund", amount: 30000, returns: 15, currency: "INR" },
    { id: 4, name: "SBI Gold Fund", type: "commodity", amount: 20000, returns: -2, currency: "INR" },
  ]

  // Calculate totals
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)

  // Calculate average returns (weighted by investment amount)
  const weightedReturns = investments.reduce((sum, inv) => sum + inv.returns * inv.amount, 0)
  const averageReturns = weightedReturns / totalInvestment

  // Calculate estimated annual returns
  const estimatedAnnualReturns = totalInvestment * (averageReturns / 100)

  // Count investments by type
  const investmentsByType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + 1
    return acc
  }, {})

  const totalInvestmentCount = investments.length

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
          <PieChart className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalInvestment, "INR")}</div>
          <p className="text-xs text-muted-foreground">Across {totalInvestmentCount} investments</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Returns</CardTitle>
          {averageReturns >= 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${averageReturns >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            {averageReturns.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">Weighted average return</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Annual Returns</CardTitle>
          <BarChart3 className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">{formatCurrency(estimatedAnnualReturns, "INR")}</div>
          <p className="text-xs text-muted-foreground">Estimated yearly earnings</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-amber-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio Mix</CardTitle>
          <PieChart className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvestmentCount}</div>
          <div className="text-xs text-muted-foreground space-y-1">
            {Object.entries(investmentsByType).map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span className="capitalize">{type.replace("_", " ")}:</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

