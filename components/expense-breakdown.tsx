"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export function ExpenseBreakdown() {
  const { state } = useExpenseContext()

  // Get expenses by category
  const expensesByCategory = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const { category, amount } = transaction
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += amount
      return acc
    }, {})

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  // Colors for the pie chart
  const COLORS = [
    "#4361ee", // blue
    "#e63946", // red
    "#7209b7", // purple
    "#f72585", // pink
    "#fb8500", // orange
    "#2a9d8f", // green
    "#00b4d8", // cyan
    "#ffb703", // yellow
  ]

  return (
    <div className="space-y-4">
      <Chart>
        <ChartContainer className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="bg-background border-border"
                    formatter={(value) => [`${formatCurrency(value, state.currency)}`, ""]}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <div className="text-sm flex justify-between w-full">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">{formatCurrency(item.value, state.currency)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
