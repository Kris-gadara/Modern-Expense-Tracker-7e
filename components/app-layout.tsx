"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"
import { Notifications } from "@/components/notifications"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state } = useExpenseContext()
  const [isMobile, setIsMobile] = useState(false)
  const [pageTitle, setPageTitle] = useState("Dashboard")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    // Set page title based on current path
    const path = pathname.split("/")[1]
    if (path) {
      setPageTitle(path.charAt(0).toUpperCase() + path.slice(1))
    } else {
      setPageTitle("Dashboard")
    }
  }, [pathname])

  // Add scroll listener for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile ? (
        <Sidebar />
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <motion.div
          className={cn(
            "flex items-center justify-between mb-6 sticky top-0 z-30 py-4 transition-all duration-300",
            isScrolled && "bg-background/80 backdrop-blur-sm shadow-sm rounded-lg px-4",
          )}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <motion.h1 className="text-3xl font-bold tracking-tight" layoutId="page-title">
              {pageTitle}
            </motion.h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={pathname}
                className="text-muted-foreground mt-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                Current Balance: <span className="font-medium">{formatCurrency(balance, state.currency)}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4">
            <Notifications />
            <ModeToggle />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="animate-in fade-in duration-500"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Helper function to conditionally join class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
