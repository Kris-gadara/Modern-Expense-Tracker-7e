"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function Overview() {
  const { state } = useExpenseContext()

  // Generate data for the last 30 days
  const generateMonthlyData = () => {
    const data = []
    const now = new Date()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), i)

      // Filter transactions for this day
      const dayTransactions = state.transactions.filter((t) => {
        const tDate = new Date(t.date)
        return (
          tDate.getDate() === date.getDate() &&
          tDate.getMonth() === date.getMonth() &&
          tDate.getFullYear() === date.getFullYear()
        )
      })

      const income = dayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

      const expense = dayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      data.push({
        name: i.toString(),
        income,
        expense,
      })
    }

    return data
  }

  const data = generateMonthlyData()

  return (
    <Chart>
      <ChartLegend className="justify-center gap-8 mb-2">
        <ChartLegendItem name="Income" color="hsl(var(--chart-1))" />
        <ChartLegendItem name="Expenses" color="hsl(var(--chart-2))" />
      </ChartLegend>
      <ChartContainer className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
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
            <Area
              type="monotone"
              dataKey="income"
              className="fill-[#4361ee]/20 stroke-[#4361ee]"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expense"
              className="fill-[#e63946]/20 stroke-[#e63946]"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}
