"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force theme to be applied immediately on first render
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme === "dark" ? "dark" : "light")
    } else {
      document.documentElement.classList.add(props.defaultTheme === "dark" ? "dark" : "light")
    }
  }, [props.defaultTheme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

