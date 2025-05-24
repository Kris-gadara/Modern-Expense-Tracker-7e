import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SipCalculator } from "@/components/sip-calculator"
import { LoanCalculator } from "@/components/loan-calculator"
import { CurrencyConverter } from "@/components/currency-converter"

export default function CalculatorsPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <Tabs defaultValue="sip" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
          <TabsTrigger value="loan">Loan Calculator</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
        </TabsList>
        <TabsContent value="sip" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>SIP Calculator</CardTitle>
              <CardDescription>Calculate returns on mutual fund SIP investments</CardDescription>
            </CardHeader>
            <CardContent>
              <SipCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="loan" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Loan Calculator</CardTitle>
              <CardDescription>Calculate EMI and loan repayment details</CardDescription>
            </CardHeader>
            <CardContent>
              <LoanCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="currency" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>Convert between different currencies</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrencyConverter />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
