import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrencySettings } from "@/components/currency-settings"
import { ThemeSettings } from "@/components/theme-settings"
import { ExportData } from "@/components/export-data"

export default function SettingsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Currency Settings</CardTitle>
            <CardDescription>Configure your default currency and display options</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencySettings />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize the appearance of your application</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSettings />
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or reset your financial data</CardDescription>
        </CardHeader>
        <CardContent>
          <ExportData />
        </CardContent>
      </Card>
    </div>
  )
}

