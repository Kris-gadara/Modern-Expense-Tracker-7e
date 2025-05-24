import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetTracker } from "@/components/budget-tracker"
import { BudgetOverview } from "@/components/budget-overview"

export default function BudgetsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <BudgetOverview />

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Budget Tracker</CardTitle>
          <CardDescription>Monitor your spending against budget limits</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetTracker />
        </CardContent>
      </Card>
    </div>
  )
}
