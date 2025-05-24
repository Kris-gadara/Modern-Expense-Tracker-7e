import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InvestmentPortfolio } from "@/components/investment-portfolio"
import { InvestmentSummary } from "@/components/investment-summary"

export default function InvestmentsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <InvestmentSummary />

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
          <CardDescription>Track your investment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentPortfolio />
        </CardContent>
      </Card>
    </div>
  )
}

