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

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state } = useExpenseContext()
  const [isMobile, setIsMobile] = useState(false)
  const [pageTitle, setPageTitle] = useState("Dashboard")

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
            <p className="text-muted-foreground mt-1">
              Current Balance: <span className="font-medium">{formatCurrency(balance, state.currency)}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Notifications />
            <ModeToggle />
          </div>
        </div>

        <main className="animate-in fade-in duration-500">{children}</main>
      </div>
    </div>
  )
}

