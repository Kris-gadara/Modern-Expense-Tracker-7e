"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, PiggyBank, TrendingDown } from "lucide-react"

export function BudgetOverview() {
  const { state } = useExpenseContext()

  // Calculate total budget amount
  const totalBudget = state.budgets.reduce((sum, budget) => sum + budget.amount, 0)

  // Calculate current month's expenses
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const currentMonthExpenses = state.transactions
    .filter((t) => {
      const tDate = new Date(t.date)
      return t.type === "expense" && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear
    })
    .reduce((sum, t) => sum + t.amount, 0)

  // Calculate number of budgets exceeded
  const exceededBudgets = state.budgets.filter((budget) => {
    const spent = state.transactions
      .filter((t) => {
        const tDate = new Date(t.date)
        return (
          t.type === "expense" &&
          t.category === budget.category &&
          tDate.getMonth() === currentMonth &&
          tDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, t) => sum + t.amount, 0)

    return spent > budget.amount
  }).length

  // Calculate remaining budget
  const remainingBudget = totalBudget - currentMonthExpenses

  // Calculate budget utilization percentage
  const budgetUtilization = totalBudget > 0 ? (currentMonthExpenses / totalBudget) * 100 : 0

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalBudget, state.currency)}</div>
          <p className="text-xs text-muted-foreground">For {state.budgets.length} categories</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Spent So Far</CardTitle>
          <TrendingDown className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">
            {formatCurrency(currentMonthExpenses, state.currency)}
          </div>
          <p className="text-xs text-muted-foreground">{budgetUtilization.toFixed(1)}% of total budget</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          <CheckCircle className={`h-4 w-4 ${remainingBudget >= 0 ? "text-emerald-500" : "text-rose-500"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${remainingBudget >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
            {formatCurrency(remainingBudget, state.currency)}
          </div>
          <p className="text-xs text-muted-foreground">
            {remainingBudget >= 0 ? "Still available to spend" : "Over budget"}
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-amber-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budgets Exceeded</CardTitle>
          <AlertTriangle className={`h-4 w-4 ${exceededBudgets > 0 ? "text-rose-500" : "text-emerald-500"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${exceededBudgets > 0 ? "text-rose-500" : "text-emerald-500"}`}>
            {exceededBudgets}
          </div>
          <p className="text-xs text-muted-foreground">
            {exceededBudgets === 0 ? "All budgets on track" : "Categories over limit"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
