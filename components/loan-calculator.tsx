"use client"

import { useState, useEffect } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

// Add the shadcn/ui Table components import
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function LoanCalculator() {
  const { state } = useExpenseContext()
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTerm, setLoanTerm] = useState(20)
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
    amortizationSchedule: [],
  })

  const calculateLoan = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const numberOfPayments = loanTerm * 12

    // Calculate EMI
    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments)) /
      (Math.pow(1 + ratePerMonth, numberOfPayments) - 1)

    // Calculate total payment and interest
    const totalPayment = emi * numberOfPayments
    const totalInterest = totalPayment - principal

    // Generate amortization schedule
    const amortizationSchedule = []
    let remainingPrincipal = principal

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingPrincipal * ratePerMonth
      const principalPayment = emi - interestPayment
      remainingPrincipal -= principalPayment

      amortizationSchedule.push({
        month: i,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingPrincipal > 0 ? remainingPrincipal : 0,
      })
    }

    setResults({
      emi,
      totalInterest,
      totalPayment,
      amortizationSchedule,
    })
  }

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm])

  // Data for pie chart
  const pieData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: results.totalInterest },
  ]

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount ({state.currency})</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min={10000}
              step={10000}
            />
          </div>
          <Slider
            value={[loanAmount]}
            min={10000}
            max={10000000}
            step={10000}
            onValueChange={(value) => setLoanAmount(value[0])}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={1}
              max={20}
              step={0.1}
            />
          </div>
          <Slider
            value={[interestRate]}
            min={1}
            max={20}
            step={0.1}
            onValueChange={(value) => setInterestRate(value[0])}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanTerm">Loan Term (Years)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>
          <Slider
            value={[loanTerm]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setLoanTerm(value[0])}
            className="mt-2"
          />
        </div>
      </div>

      <Button onClick={calculateLoan} className="w-full">
        Calculate
      </Button>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Monthly EMI</p>
          <p className="text-2xl font-bold">{formatCurrency(results.emi, state.currency)}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Total Interest</p>
          <p className="text-2xl font-bold text-rose-500">{formatCurrency(results.totalInterest, state.currency)}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card text-center">
          <p className="text-sm text-muted-foreground">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(results.totalPayment, state.currency)}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Chart>
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
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
                  {pieData.map((entry, index) => (
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

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Loan Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" />
              <div className="text-sm flex justify-between w-full">
                <span className="font-medium">Principal</span>
                <span className="text-muted-foreground">{formatCurrency(loanAmount, state.currency)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" />
              <div className="text-sm flex justify-between w-full">
                <span className="font-medium">Interest</span>
                <span className="text-muted-foreground">{formatCurrency(results.totalInterest, state.currency)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-medium">Loan Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Amount:</span>
                <span>{formatCurrency(loanAmount, state.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span>{interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Term:</span>
                <span>{loanTerm} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly EMI:</span>
                <span>{formatCurrency(results.emi, state.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest:</span>
                <span>{formatCurrency(results.totalInterest, state.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Payment:</span>
                <span>{formatCurrency(results.totalPayment, state.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="yearly" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-[200px]">
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="yearly" className="space-y-4">
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Principal Paid</TableHead>
                  <TableHead>Interest Paid</TableHead>
                  <TableHead>Remaining Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: loanTerm }).map((_, index) => {
                  const yearStart = index * 12
                  const yearEnd = Math.min((index + 1) * 12, results.amortizationSchedule.length)

                  const yearlyData = results.amortizationSchedule.slice(yearStart, yearEnd)
                  const principalPaid = yearlyData.reduce((sum, month) => sum + month.principal, 0)
                  const interestPaid = yearlyData.reduce((sum, month) => sum + month.interest, 0)
                  const remainingBalance = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].balance : 0

                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatCurrency(principalPaid, state.currency)}</TableCell>
                      <TableCell>{formatCurrency(interestPaid, state.currency)}</TableCell>
                      <TableCell>{formatCurrency(remainingBalance, state.currency)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.amortizationSchedule.slice(0, 60).map((month) => (
                  <TableRow key={month.month}>
                    <TableCell>{month.month}</TableCell>
                    <TableCell>{formatCurrency(month.emi, state.currency)}</TableCell>
                    <TableCell>{formatCurrency(month.principal, state.currency)}</TableCell>
                    <TableCell>{formatCurrency(month.interest, state.currency)}</TableCell>
                    <TableCell>{formatCurrency(month.balance, state.currency)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <p className="text-xs text-muted-foreground text-center">
            Showing first 60 months. Full schedule available for download.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
