"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle, CreditCard, Wallet, Building, Landmark, Edit2, Trash2 } from "lucide-react"
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

export function AccountsList() {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState([
    { id: 1, name: "HDFC Bank", type: "bank", balance: 25000, currency: "INR" },
    { id: 2, name: "SBI Savings", type: "bank", balance: 15000, currency: "INR" },
    { id: 3, name: "ICICI Credit Card", type: "credit", balance: -5000, currency: "INR" },
    { id: 4, name: "Cash Wallet", type: "cash", balance: 2000, currency: "INR" },
  ])
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "bank",
    balance: "",
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

    const accountData = {
      ...formData,
      balance: Number.parseFloat(formData.balance),
      id: editingAccount ? editingAccount.id : Date.now(),
    }

    if (editingAccount) {
      setAccounts((prev) => prev.map((account) => (account.id === editingAccount.id ? accountData : account)))
      toast({
        title: "Account updated",
        description: `${accountData.name} has been updated successfully.`,
      })
    } else {
      setAccounts((prev) => [...prev, accountData])
      toast({
        title: "Account added",
        description: `${accountData.name} has been added successfully.`,
      })
    }

    setFormData({
      name: "",
      type: "bank",
      balance: "",
      currency: "INR",
    })
    setShowAddAccount(false)
    setEditingAccount(null)
  }

  const handleEdit = (account) => {
    setEditingAccount(account)
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
    })
    setShowAddAccount(true)
  }

  const handleDelete = (id) => {
    const accountToDelete = accounts.find((account) => account.id === id)
    setAccounts((prev) => prev.filter((account) => account.id !== id))
    toast({
      title: "Account deleted",
      description: `${accountToDelete.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const getAccountIcon = (type) => {
    switch (type) {
      case "bank":
        return <Building className="h-5 w-5" />
      case "credit":
        return <CreditCard className="h-5 w-5" />
      case "cash":
        return <Wallet className="h-5 w-5" />
      case "investment":
        return <Landmark className="h-5 w-5" />
      default:
        return <Building className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddAccount(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <Card key={account.id} className="p-4 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    account.type === "bank"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : account.type === "credit"
                        ? "bg-rose-100 dark:bg-rose-900"
                        : account.type === "cash"
                          ? "bg-emerald-100 dark:bg-emerald-900"
                          : "bg-purple-100 dark:bg-purple-900"
                  }`}
                >
                  {getAccountIcon(account.type)}
                </div>
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(account)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(account.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-xl font-bold ${account.balance < 0 ? "text-rose-500" : ""}`}>
                {formatCurrency(account.balance, account.currency)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showAddAccount} onOpenChange={setShowAddAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAccount ? "Edit Account" : "Add Account"}</DialogTitle>
            <DialogDescription>
              {editingAccount ? "Update your account details below." : "Add a new account to track your finances."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Account Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => handleChange("balance", e.target.value)}
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
              <Button type="submit">{editingAccount ? "Update" : "Add"} Account</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

