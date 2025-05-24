"use client"

import { useState, useEffect } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { formatCurrency } from "@/lib/utils"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Notifications() {
  const { state } = useExpenseContext()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Check for budget alerts
    const budgetAlerts = []

    state.budgets.forEach((budget) => {
      const spent = state.transactions
        .filter(
          (t) =>
            t.type === "expense" &&
            t.category === budget.category &&
            new Date(t.date).getMonth() === new Date().getMonth() &&
            new Date(t.date).getFullYear() === new Date().getFullYear(),
        )
        .reduce((sum, t) => sum + t.amount, 0)

      if (spent > budget.amount) {
        budgetAlerts.push({
          id: `budget-${budget.id}`,
          type: "budget-exceeded",
          title: "Budget Alert",
          message: `You've exceeded your ${budget.category} budget by ${formatCurrency(spent - budget.amount, state.currency)}.`,
          date: new Date().toISOString(),
          read: false,
        })
      } else if (spent > budget.amount * 0.8) {
        budgetAlerts.push({
          id: `budget-warning-${budget.id}`,
          type: "budget-warning",
          title: "Budget Warning",
          message: `You've used ${Math.round((spent / budget.amount) * 100)}% of your ${budget.category} budget.`,
          date: new Date().toISOString(),
          read: false,
        })
      }
    })

    // Combine with existing notifications, avoiding duplicates
    const existingIds = notifications.map((n) => n.id)
    const newAlerts = budgetAlerts.filter((alert) => !existingIds.includes(alert.id))

    if (newAlerts.length > 0) {
      setNotifications((prev) => [...newAlerts, ...prev])
      setUnreadCount((prev) => prev + newAlerts.length)
    }
  }, [state.transactions, state.budgets])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h4 className="font-medium">Notifications</h4>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${notification.read ? "bg-background" : "bg-muted/50"}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <h5 className="font-medium">{notification.title}</h5>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

