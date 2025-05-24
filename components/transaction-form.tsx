"use client"

import { useState } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from "uuid"

export function TransactionForm({
  transaction,
  onComplete,
}: {
  transaction?: any
  onComplete?: () => void
}) {
  const { dispatch } = useExpenseContext()
  const isEditing = !!transaction

  const [formData, setFormData] = useState({
    title: transaction?.title || "",
    amount: transaction?.amount || "",
    type: transaction?.type || "expense",
    category: transaction?.category || "",
    date: transaction?.date
      ? new Date(transaction.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  })

  const categories = {
    expense: ["Food", "Transport", "Entertainment", "Shopping", "Utilities", "Other"],
    income: ["Salary", "Freelance", "Investment", "Other"],
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const transactionData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      id: transaction?.id || uuidv4(),
      date: new Date(formData.date).toISOString(),
    }

    if (isEditing) {
      dispatch({
        type: "UPDATE_TRANSACTION",
        payload: transactionData,
      })
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: transactionData,
      })
    }

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    })

    if (onComplete) {
      onComplete()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Transaction title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => {
            handleChange("type", value)
            handleChange("category", "")
          }}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories[formData.type].map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update" : "Add"} Transaction
      </Button>
    </form>
  )
}
