"use client"

import type React from "react"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, Wallet, PiggyBank } from "lucide-react"
import { motion } from "framer-motion"

export function ProfileStats() {
  const { state } = useExpenseContext()

  // Calculate stats
  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const totalSavings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0

  // Calculate monthly stats
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyTransactions = state.transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const monthlyIncome = monthlyTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpenses = monthlyTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const monthlySavings = monthlyIncome - monthlyExpenses
  const monthlySavingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <Tabs defaultValue="overall" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overall">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <StatCard
              title="Total Income"
              value={formatCurrency(totalIncome, state.currency)}
              icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />}
              trend="+12.5% from last year"
              color="emerald"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Total Expenses"
              value={formatCurrency(totalExpenses, state.currency)}
              icon={<Wallet className="h-4 w-4 text-rose-500" />}
              trend="+8.3% from last year"
              color="rose"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Total Savings"
              value={formatCurrency(totalSavings, state.currency)}
              icon={<PiggyBank className="h-4 w-4 text-blue-500" />}
              trend="+15.2% from last year"
              color="blue"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Savings Rate"
              value={`${savingsRate.toFixed(1)}%`}
              icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
              trend="+2.1% from last year"
              color="purple"
            />
          </motion.div>
        </motion.div>
      </TabsContent>

      <TabsContent value="monthly">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <StatCard
              title="Monthly Income"
              value={formatCurrency(monthlyIncome, state.currency)}
              icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />}
              trend="+5.2% from last month"
              color="emerald"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Monthly Expenses"
              value={formatCurrency(monthlyExpenses, state.currency)}
              icon={<Wallet className="h-4 w-4 text-rose-500" />}
              trend="+3.7% from last month"
              color="rose"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Monthly Savings"
              value={formatCurrency(monthlySavings, state.currency)}
              icon={<PiggyBank className="h-4 w-4 text-blue-500" />}
              trend="+7.8% from last month"
              color="blue"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Monthly Rate"
              value={`${monthlySavingsRate.toFixed(1)}%`}
              icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
              trend="+1.5% from last month"
              color="purple"
            />
          </motion.div>
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: "emerald" | "rose" | "blue" | "purple" | "amber"
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorMap = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    rose: "from-rose-500/20 to-rose-500/5 border-rose-500/20",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  }

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] overflow-hidden border bg-gradient-to-br ${colorMap[color]}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{trend}</p>
        </div>
      </CardContent>
    </Card>
  )
}
