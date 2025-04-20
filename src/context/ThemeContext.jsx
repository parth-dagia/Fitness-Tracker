"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Default to false for initial render and SSR
    if (!isBrowser) return false
    
    try {
      // Check local storage or user preference
      const savedTheme = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      return savedTheme === "dark" || (!savedTheme && prefersDark)
    } catch (error) {
      console.error("Error accessing localStorage or window:", error)
      return false
    }
  })

  // Use a separate useEffect for document manipulation
  useEffect(() => {
    // This effect only runs on the client side
    // Update document class when theme changes
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Use a separate useEffect for localStorage operations
  useEffect(() => {
    // Skip during SSR
    if (!isBrowser) return

    // Save preference to localStorage
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light")
    } catch (error) {
      console.error("Error saving theme to localStorage:", error)
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
