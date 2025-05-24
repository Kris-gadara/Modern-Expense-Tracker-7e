"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  PiggyBank,
  Settings,
  Wallet,
  Calculator,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
    <motion.div
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out relative",
        collapsed ? "w-20" : "w-64",
      )}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapse}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-background shadow-md z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="p-4 flex items-center justify-between border-b border-border">
        <AnimatePresence>
          {!collapsed && (
            <motion.h2
              className="font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ExpenseTracker
            </motion.h2>
          )}
        </AnimatePresence>
        {collapsed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full flex justify-center">
            <span className="text-2xl font-bold">💰</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="p-4 border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="font-bold text-lg">{formatCurrency(balance, state.currency)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <motion.li key={item.path} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all",
                          collapsed ? "px-2" : "px-3",
                          isActive && "font-medium",
                          isActive ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-accent/80",
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
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              className="transition-all"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <div className="p-2 mt-auto border-t border-border">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-accent/80",
                  collapsed ? "px-2" : "px-3",
                  pathname === "/settings" && "bg-primary/10 hover:bg-primary/20",
                )}
                onClick={() => router.push("/settings")}
              >
                <Settings
                  className={cn(
                    "h-5 w-5 text-muted-foreground",
                    collapsed ? "mr-0" : "mr-2",
                    pathname === "/settings" && "text-primary",
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      Settings
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Settings</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-accent/80 mt-2",
                  collapsed ? "px-2" : "px-3",
                  pathname === "/profile" && "bg-primary/10 hover:bg-primary/20",
                )}
                onClick={() => router.push("/profile")}
              >
                <User
                  className={cn(
                    "h-5 w-5 text-muted-foreground",
                    collapsed ? "mr-0" : "mr-2",
                    pathname === "/profile" && "text-primary",
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      Profile
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Profile</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* User Profile Section */}
      <div className="p-2 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-md hover:bg-accent/80 cursor-pointer transition-all",
            collapsed ? "justify-center" : "justify-start",
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-primary/10 text-primary">RK</AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className="flex-1 min-w-0"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
              >
                <p className="text-sm font-medium truncate">Rahul Kumar</p>
                <p className="text-xs text-muted-foreground truncate">rahul.kumar@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
