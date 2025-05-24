import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountsList } from "@/components/accounts-list"
import { AccountSummary } from "@/components/account-summary"

export default function AccountsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <AccountSummary />

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>Manage your financial accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountsList />
        </CardContent>
      </Card>
    </div>
  )
}

