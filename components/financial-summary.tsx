"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react"

export function FinancialSummary() {
  const { state } = useExpenseContext()

  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  // Calculate month-over-month changes (mock data for now)
  const balanceChange = balance > 0 ? "+12.5%" : "-3.2%"
  const incomeChange = "+8.2%"
  const expenseChange = "+4.1%"

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance, state.currency)}</div>
          <p className="text-xs text-muted-foreground">{balanceChange} from last month</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">{formatCurrency(totalIncome, state.currency)}</div>
          <p className="text-xs text-muted-foreground">{incomeChange} from last month</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">{formatCurrency(totalExpenses, state.currency)}</div>
          <p className="text-xs text-muted-foreground">{expenseChange} from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

