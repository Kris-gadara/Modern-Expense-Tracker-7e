import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { ExpenseBreakdown } from "@/components/expense-breakdown"
import { SpendingTrends } from "@/components/spending-trends"
import { IncomeExpenseRatio } from "@/components/income-expense-ratio"

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[500px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
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
                <CardTitle>Income vs Expense</CardTitle>
                <CardDescription>Balance between earnings and spending</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeExpenseRatio />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Your spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseBreakdown />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>How your spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingTrends />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Detailed monthly financial summary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Monthly reports coming soon</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Annual Report</CardTitle>
                <CardDescription>Yearly financial overview</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Annual reports coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
