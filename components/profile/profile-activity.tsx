"use client"

import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowDownIcon, ArrowUpIcon, CreditCard, PiggyBank, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

export function ProfileActivity() {
  const { state } = useExpenseContext()

  // Get recent transactions
  const recentTransactions = [...state.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "budget_created",
      title: "Created new budget",
      description: "Shopping budget created",
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
      icon: <PiggyBank className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 2,
      type: "report_generated",
      title: "Monthly report generated",
      description: "April 2023 financial report",
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
      icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 3,
      type: "account_linked",
      title: "New account linked",
      description: "HDFC Credit Card linked",
      date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      icon: <CreditCard className="h-5 w-5 text-emerald-500" />,
    },
  ]

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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
        <ScrollArea className="h-[200px]">
          <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
            {recentTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                variants={item}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-emerald-100 dark:bg-emerald-900"
                      : "bg-rose-100 dark:bg-rose-900"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
                <p className={`font-medium ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount, state.currency)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Recent Activities</h3>
        <ScrollArea className="h-[200px]">
          <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={item}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  )
}
