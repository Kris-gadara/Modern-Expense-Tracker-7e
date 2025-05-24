"use client"

import { useState } from "react"
import { useExpenseContext } from "@/context/expense-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download, RefreshCw, Trash2 } from "lucide-react"

export function ExportData() {
  const { state, dispatch } = useExpenseContext()
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Create a JSON blob with the data
    const data = JSON.stringify(state, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    // Create a link and trigger download
    const link = document.createElement("a")
    link.href = url
    link.download = `expense-tracker-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setIsExporting(false)

    toast({
      title: "Data exported",
      description: "Your financial data has been exported successfully.",
    })
  }

  const handleReset = () => {
    // Reset the state to initial values
    dispatch({ type: "RESET_DATA" })

    toast({
      title: "Data reset",
      description: "All your financial data has been reset.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Export Data</h3>
          <p className="text-sm text-muted-foreground">
            Download all your financial data as a JSON file for backup or transfer.
          </p>
          <Button onClick={handleExport} className="w-full mt-2" disabled={isExporting}>
            {isExporting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Reset Data</h3>
          <p className="text-sm text-muted-foreground">
            Delete all your financial data and start fresh. This action cannot be undone.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-2">
                <Trash2 className="mr-2 h-4 w-4" />
                Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your financial data including
                  transactions, budgets, and settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Reset Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

