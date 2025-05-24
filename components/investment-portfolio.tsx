"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle, TrendingUp, TrendingDown, Edit2, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function InvestmentPortfolio() {
  const { toast } = useToast()
  const [investments, setInvestments] = useState([
    { id: 1, name: "HDFC Mutual Fund", type: "mutual_fund", amount: 50000, returns: 12, currency: "INR" },
    { id: 2, name: "Reliance ETF", type: "etf", amount: 25000, returns: 8, currency: "INR" },
    { id: 3, name: "Tata Digital India Fund", type: "mutual_fund", amount: 30000, returns: 15, currency: "INR" },
    { id: 4, name: "SBI Gold Fund", type: "commodity", amount: 20000, returns: -2, currency: "INR" },
  ])
  const [showAddInvestment, setShowAddInvestment] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "mutual_fund",
    amount: "",
    returns: "",
    currency: "INR",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const investmentData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      returns: Number.parseFloat(formData.returns),
      id: editingInvestment ? editingInvestment.id : Date.now(),
    }

    if (editingInvestment) {
      setInvestments((prev) =>
        prev.map((investment) => (investment.id === editingInvestment.id ? investmentData : investment)),
      )
      toast({
        title: "Investment updated",
        description: `${investmentData.name} has been updated successfully.`,
      })
    } else {
      setInvestments((prev) => [...prev, investmentData])
      toast({
        title: "Investment added",
        description: `${investmentData.name} has been added successfully.`,
      })
    }

    setFormData({
      name: "",
      type: "mutual_fund",
      amount: "",
      returns: "",
      currency: "INR",
    })
    setShowAddInvestment(false)
    setEditingInvestment(null)
  }

  const handleEdit = (investment) => {
    setEditingInvestment(investment)
    setFormData({
      name: investment.name,
      type: investment.type,
      amount: investment.amount.toString(),
      returns: investment.returns.toString(),
      currency: investment.currency,
    })
    setShowAddInvestment(true)
  }

  const handleDelete = (id) => {
    const investmentToDelete = investments.find((investment) => investment.id === id)
    setInvestments((prev) => prev.filter((investment) => investment.id !== id))
    toast({
      title: "Investment deleted",
      description: `${investmentToDelete.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const getInvestmentTypeLabel = (type) => {
    switch (type) {
      case "mutual_fund":
        return "Mutual Fund"
      case "etf":
        return "ETF"
      case "stock":
        return "Stock"
      case "bond":
        return "Bond"
      case "commodity":
        return "Commodity"
      default:
        return type
    }
  }

  // Calculate total investment amount
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddInvestment(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {investments.map((investment) => (
          <Card
            key={investment.id}
            className="p-4 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{investment.name}</h3>
                <p className="text-xs text-muted-foreground">{getInvestmentTypeLabel(investment.type)}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(investment)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(investment.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-lg font-bold">{formatCurrency(investment.amount, investment.currency)}</p>
                <div className={`flex items-center ${investment.returns >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {investment.returns >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{investment.returns}%</span>
                </div>
              </div>
              <Progress value={(investment.amount / totalInvestment) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {((investment.amount / totalInvestment) * 100).toFixed(1)}% of portfolio
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showAddInvestment} onOpenChange={setShowAddInvestment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingInvestment ? "Edit Investment" : "Add Investment"}</DialogTitle>
            <DialogDescription>
              {editingInvestment
                ? "Update your investment details below."
                : "Add a new investment to track your portfolio."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Investment Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Investment Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                    <SelectItem value="etf">ETF</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="bond">Bond</SelectItem>
                    <SelectItem value="commodity">Commodity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returns">Returns (%)</Label>
                <Input
                  id="returns"
                  type="number"
                  step="0.1"
                  value={formData.returns}
                  onChange={(e) => handleChange("returns", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingInvestment ? "Update" : "Add"} Investment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

