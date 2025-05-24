"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, DollarSign, Home, PiggyBank, Settings, Wallet, Calculator, User } from "lucide-react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { state } = useExpenseContext()
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", newState.toString())
  }

  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Wallet, label: "Transactions", path: "/transactions" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: PiggyBank, label: "Budgets", path: "/budgets" },
    { icon: Calculator, label: "Calculators", path: "/calculators" },
    { icon: CreditCard, label: "Accounts", path: "/accounts" },
    { icon: DollarSign, label: "Investments", path: "/investments" },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className={cn("font-bold text-xl transition-opacity", collapsed ? "opacity-0 w-0" : "opacity-100")}>
          ExpenseTracker
        </h2>
        <Button variant="ghost" size="sm" onClick={toggleCollapse} className="h-8 w-8 p-0 rounded-full hover:bg-accent">
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      <div className={cn("p-4 border-b border-border", collapsed ? "hidden" : "block")}>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Balance</p>
          <p className="font-bold text-lg">{formatCurrency(balance, state.currency)}</p>
        </div>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all",
                    collapsed ? "px-2" : "px-3",
                    isActive && "font-medium",
                  )}
                  onClick={() => router.push(item.path)}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-all",
                      collapsed ? "mr-0" : "mr-2",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className={cn("transition-all", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                    {item.label}
                  </span>
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-2 mt-auto border-t border-border">
        <Button
          variant="ghost"
          className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
          onClick={() => router.push("/settings")}
        >
          <Settings className={cn("h-5 w-5 text-muted-foreground", collapsed ? "mr-0" : "mr-2")} />
          <span className={cn("transition-opacity", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>Settings</span>
        </Button>

        <Button
          variant="ghost"
          className={cn("w-full justify-start mt-2", collapsed ? "px-2" : "px-3")}
          onClick={() => router.push("/profile")}
        >
          <User className={cn("h-5 w-5 text-muted-foreground", collapsed ? "mr-0" : "mr-2")} />
          <span className={cn("transition-opacity", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>Profile</span>
        </Button>
      </div>
    </div>
  )
}

