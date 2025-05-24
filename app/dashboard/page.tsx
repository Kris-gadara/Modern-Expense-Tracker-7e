import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { ExpenseBreakdown } from "@/components/expense-breakdown"
import { FinancialSummary } from "@/components/financial-summary"

export default function DashboardPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <FinancialSummary />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Your financial activity for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Your spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseBreakdown />
              </CardContent>
            </Card>
          </div>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions limit={5} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Manage your financial records</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions limit={10} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>How your spending has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Spending trends visualization coming soon</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Savings Potential</CardTitle>
                <CardDescription>Areas where you could save money</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Savings potential analysis coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

