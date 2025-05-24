"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

export function TransactionStats() {
  const { state } = useExpenseContext()

  // Get current month transactions
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const currentMonthTransactions = state.transactions.filter((t) => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
  })

  const monthlyIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyExpenses = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // Get previous month for comparison
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const previousMonthTransactions = state.transactions.filter((t) => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === previousMonth && transactionDate.getFullYear() === previousYear
  })

  const previousMonthIncome = previousMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const previousMonthExpenses = previousMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // Calculate percentage changes
  const incomeChange =
    previousMonthIncome === 0 ? 100 : ((monthlyIncome - previousMonthIncome) / previousMonthIncome) * 100

  const expenseChange =
    previousMonthExpenses === 0 ? 100 : ((monthlyExpenses - previousMonthExpenses) / previousMonthExpenses) * 100

  // Get month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonthName = monthNames[currentMonth]

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          <CalendarIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMonthName}</div>
          <p className="text-xs text-muted-foreground">{currentYear}</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">{formatCurrency(monthlyIncome, state.currency)}</div>
          <div className="flex items-center text-xs">
            {incomeChange >= 0 ? (
              <>
                <TrendingUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">+{incomeChange.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDownIcon className="mr-1 h-3 w-3 text-rose-500" />
                <span className="text-rose-500">{incomeChange.toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1 text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">{formatCurrency(monthlyExpenses, state.currency)}</div>
          <div className="flex items-center text-xs">
            {expenseChange <= 0 ? (
              <>
                <TrendingDownIcon className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">{Math.abs(expenseChange).toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingUpIcon className="mr-1 h-3 w-3 text-rose-500" />
                <span className="text-rose-500">+{expenseChange.toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1 text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
