"use client"

import { useState } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Edit2Icon, PlusCircle, Trash2Icon } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BudgetTracker() {
  const { state, dispatch } = useExpenseContext()
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)
  const [deletingBudget, setDeletingBudget] = useState(null)
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const budgetData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      id: editingBudget?.id || uuidv4(),
    }

    if (editingBudget) {
      dispatch({
        type: "UPDATE_BUDGET",
        payload: budgetData,
      })
      setEditingBudget(null)
    } else {
      dispatch({
        type: "ADD_BUDGET",
        payload: budgetData,
      })
      setShowAddBudget(false)
    }

    setFormData({
      category: "",
      amount: "",
    })
  }

  const handleDelete = () => {
    if (deletingBudget) {
      dispatch({
        type: "DELETE_BUDGET",
        payload: deletingBudget.id,
      })
      setDeletingBudget(null)
    }
  }

  const handleEdit = (budget) => {
    setEditingBudget(budget)
    setFormData({
      category: budget.category,
      amount: budget.amount.toString(),
    })
  }

  // Calculate spending for each category
  const getCategorySpending = (category) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return state.transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === category &&
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear,
      )
      .reduce((sum, t) => sum + t.amount, 0)
  }

  // Get all expense categories that don't have a budget yet
  const availableCategories = ["Food", "Transport", "Entertainment", "Shopping", "Utilities", "Other"].filter(
    (category) => !state.budgets.some((budget) => budget.category === category),
  )

  return (
    <div className="space-y-4">
      {state.budgets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No budgets set yet</p>
          <Button onClick={() => setShowAddBudget(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Budget
          </Button>
        </div>
      )}

      {state.budgets.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Monthly Budgets</h3>
            <Button onClick={() => setShowAddBudget(true)} disabled={availableCategories.length === 0}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {state.budgets.map((budget) => {
                const spent = getCategorySpending(budget.category)
                const percentage = Math.min(Math.round((spent / budget.amount) * 100), 100)
                const isOverBudget = spent > budget.amount

                return (
                  <div key={budget.id} className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{budget.category}</h4>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(budget)}>
                          <Edit2Icon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => setDeletingBudget(budget)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <span>Spent: {formatCurrency(spent, state.currency)}</span>
                      <span>Budget: {formatCurrency(budget.amount, state.currency)}</span>
                    </div>

                    <Progress
                      value={percentage}
                      className={isOverBudget ? "bg-rose-200 dark:bg-rose-950" : "bg-blue-100 dark:bg-blue-900"}
                      indicatorClassName={isOverBudget ? "bg-rose-500" : "bg-emerald-500"}
                    />

                    <div className="flex justify-between text-sm mt-1">
                      <span className={isOverBudget ? "text-destructive font-medium" : ""}>{percentage}%</span>
                      <span className={isOverBudget ? "text-destructive font-medium" : ""}>
                        {formatCurrency(budget.amount - spent, state.currency)}{" "}
                        {isOverBudget ? "over budget" : "remaining"}
                      </span>
                    </div>

                    {isOverBudget && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Budget Exceeded</AlertTitle>
                        <AlertDescription>
                          You've exceeded your {budget.category} budget by{" "}
                          {formatCurrency(spent - budget.amount, state.currency)}.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </>
      )}

      {/* Add/Edit Budget Dialog */}
      <Dialog
        open={showAddBudget || !!editingBudget}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddBudget(false)
            setEditingBudget(null)
            setFormData({ category: "", amount: "" })
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBudget ? "Edit Budget" : "Add Budget"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                disabled={!!editingBudget}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {editingBudget ? (
                    <SelectItem value={editingBudget.category}>{editingBudget.category}</SelectItem>
                  ) : (
                    availableCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monthly Budget Amount</Label>
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

            <Button type="submit" className="w-full">
              {editingBudget ? "Update" : "Add"} Budget
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingBudget} onOpenChange={(open) => !open && setDeletingBudget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete this budget.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

