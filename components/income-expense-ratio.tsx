"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export function IncomeExpenseRatio() {
  const { state } = useExpenseContext()

  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ]

  const COLORS = ["#4361ee", "#e63946"]

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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" />
          <div className="text-sm flex justify-between w-full">
            <span className="font-medium">Income</span>
            <span className="text-muted-foreground">{formatCurrency(totalIncome, state.currency)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" />
          <div className="text-sm flex justify-between w-full">
            <span className="font-medium">Expenses</span>
            <span className="text-muted-foreground">{formatCurrency(totalExpenses, state.currency)}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Savings Rate</span>
          <span className="text-sm font-medium">
            {totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  )
}

