import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ExpenseProvider } from "@/context/expense-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Expense Tracker",
  description: "A modern expense tracking application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ExpenseProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ExpenseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

