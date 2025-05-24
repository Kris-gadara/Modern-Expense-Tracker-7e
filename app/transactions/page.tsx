import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionForm } from "@/components/transaction-form"
import { RecentTransactions } from "@/components/recent-transactions"
import { TransactionStats } from "@/components/transaction-stats"

export default function TransactionsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <TransactionStats />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow md:sticky md:top-4 md:h-fit">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
            <CardDescription>Record a new expense or income</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionForm />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>Manage your financial records</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
