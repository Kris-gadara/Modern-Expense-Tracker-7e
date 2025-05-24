"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Building, CreditCard, Wallet, Landmark } from "lucide-react"

export function AccountSummary() {
  // Mock data - in a real app, this would come from your accounts state
  const accounts = [
    { id: 1, name: "HDFC Bank", type: "bank", balance: 25000, currency: "INR" },
    { id: 2, name: "SBI Savings", type: "bank", balance: 15000, currency: "INR" },
    { id: 3, name: "ICICI Credit Card", type: "credit", balance: -5000, currency: "INR" },
    { id: 4, name: "Cash Wallet", type: "cash", balance: 2000, currency: "INR" },
  ]

  // Calculate totals by account type
  const bankTotal = accounts.filter((a) => a.type === "bank").reduce((sum, a) => sum + a.balance, 0)

  const creditTotal = accounts.filter((a) => a.type === "credit").reduce((sum, a) => sum + a.balance, 0)

  const cashTotal = accounts.filter((a) => a.type === "cash").reduce((sum, a) => sum + a.balance, 0)

  const investmentTotal = accounts.filter((a) => a.type === "investment").reduce((sum, a) => sum + a.balance, 0)

  // Calculate net worth
  const netWorth = bankTotal + creditTotal + cashTotal + investmentTotal

  return (
    <div className="grid gap-4 md:grid-cols-5 mb-6">
      <Card className="md:col-span-2 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
          <Landmark className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(netWorth, "INR")}</div>
          <p className="text-xs text-muted-foreground">Total across all accounts</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bank</CardTitle>
          <Building className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(bankTotal, "INR")}</div>
          <p className="text-xs text-muted-foreground">{accounts.filter((a) => a.type === "bank").length} accounts</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit</CardTitle>
          <CreditCard className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">{formatCurrency(creditTotal, "INR")}</div>
          <p className="text-xs text-muted-foreground">{accounts.filter((a) => a.type === "credit").length} accounts</p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cash</CardTitle>
          <Wallet className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(cashTotal, "INR")}</div>
          <p className="text-xs text-muted-foreground">{accounts.filter((a) => a.type === "cash").length} accounts</p>
        </CardContent>
      </Card>
    </div>
  )
}
