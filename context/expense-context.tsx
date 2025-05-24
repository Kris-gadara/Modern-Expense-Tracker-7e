"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"

// Initial state
const initialState = {
  transactions: [
    {
      id: uuidv4(),
      title: "Salary",
      amount: 50000,
      type: "income",
      category: "Salary",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Rent",
      amount: 15000,
      type: "expense",
      category: "Housing",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Groceries",
      amount: 3500,
      type: "expense",
      category: "Food",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 8).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Dinner",
      amount: 1200,
      type: "expense",
      category: "Food",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Freelance Project",
      amount: 25000,
      type: "income",
      category: "Freelance",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Shopping",
      amount: 2500,
      type: "expense",
      category: "Shopping",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString(),
    },
  ],
  budgets: [
    {
      id: uuidv4(),
      category: "Food",
      amount: 8000,
    },
    {
      id: uuidv4(),
      category: "Shopping",
      amount: 5000,
    },
  ],
  currency: "INR",
}

// Reducer function
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      }
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
      }
    case "ADD_BUDGET":
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      }
    case "UPDATE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.map((budget) => (budget.id === action.payload.id ? action.payload : budget)),
      }
    case "DELETE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      }
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      }
    case "RESET_DATA":
      // Return a fresh copy of initialState to ensure complete reset
      return JSON.parse(JSON.stringify(initialState))
    default:
      return state
  }
}

// Create context
const ExpenseContext = createContext()

// Provider component
export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState)
  const { toast } = useToast()

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("expenseTrackerState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)

        // Dispatch actions to set the state
        if (parsedState.transactions) {
          parsedState.transactions.forEach((transaction) => {
            dispatch({ type: "ADD_TRANSACTION", payload: transaction })
          })
        }

        if (parsedState.budgets) {
          parsedState.budgets.forEach((budget) => {
            dispatch({ type: "ADD_BUDGET", payload: budget })
          })
        }

        if (parsedState.currency) {
          dispatch({ type: "SET_CURRENCY", payload: parsedState.currency })
        }
      } catch (error) {
        console.error("Error loading state from localStorage:", error)
        toast({
          title: "Error loading data",
          description: "There was an error loading your saved data.",
          variant: "destructive",
        })
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("expenseTrackerState", JSON.stringify(state))
  }, [state])

  return <ExpenseContext.Provider value={{ state, dispatch }}>{children}</ExpenseContext.Provider>
}

// Custom hook to use the expense context
export const useExpenseContext = () => useContext(ExpenseContext)
