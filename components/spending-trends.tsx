"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function SpendingTrends() {
  const { state } = useExpenseContext()

  // Generate data for the last 6 months
  const generateMonthlyData = () => {
    const data = []
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Get month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Generate data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      let month = currentMonth - i
      let year = currentYear

      if (month < 0) {
        month += 12
        year -= 1
      }

      // Filter transactions for this month
      const monthTransactions = state.transactions.filter((t) => {
        const tDate = new Date(t.date)
        return tDate.getMonth() === month && tDate.getFullYear() === year
      })

      // Get expenses by category
      const food = monthTransactions
        .filter((t) => t.type === "expense" && t.category === "Food")
        .reduce((sum, t) => sum + t.amount, 0)

      const transport = monthTransactions
        .filter((t) => t.type === "expense" && t.category === "Transport")
        .reduce((sum, t) => sum + t.amount, 0)

      const entertainment = monthTransactions
        .filter((t) => t.type === "expense" && t.category === "Entertainment")
        .reduce((sum, t) => sum + t.amount, 0)

      const shopping = monthTransactions
        .filter((t) => t.type === "expense" && t.category === "Shopping")
        .reduce((sum, t) => sum + t.amount, 0)

      const utilities = monthTransactions
        .filter((t) => t.type === "expense" && t.category === "Utilities")
        .reduce((sum, t) => sum + t.amount, 0)

      const other = monthTransactions
        .filter(
          (t) =>
            t.type === "expense" &&
            !["Food", "Transport", "Entertainment", "Shopping", "Utilities"].includes(t.category),
        )
        .reduce((sum, t) => sum + t.amount, 0)

      data.push({
        name: monthNames[month],
        Food: food,
        Transport: transport,
        Entertainment: entertainment,
        Shopping: shopping,
        Utilities: utilities,
        Other: other,
      })
    }

    return data
  }

  const data = generateMonthlyData()

  return (
    <Chart>
      <ChartContainer className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            <Bar dataKey="Food" fill="#e63946" />
            <Bar dataKey="Transport" fill="#4361ee" />
            <Bar dataKey="Entertainment" fill="#7209b7" />
            <Bar dataKey="Shopping" fill="#f72585" />
            <Bar dataKey="Utilities" fill="#fb8500" />
            <Bar dataKey="Other" fill="#2a9d8f" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}

