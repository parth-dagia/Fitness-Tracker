"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create a context for user data
const UserContext = createContext()

// Default user profile
const defaultUserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  height: 175,
  weight: 70,
  goal: "Build muscle",
}

const USER_STORAGE_KEY = "fitness_tracker_user_profile"

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

export function UserProvider({ children }) {
  // Initialize state with data from localStorage if available
  const [userProfile, setUserProfile] = useState(() => {
    if (!isBrowser) return defaultUserProfile

    try {
      const savedProfile = localStorage.getItem(USER_STORAGE_KEY)
      return savedProfile ? JSON.parse(savedProfile) : defaultUserProfile
    } catch (error) {
      console.error("Error loading user profile from localStorage:", error)
      return defaultUserProfile
    }
  })

  // Update localStorage when profile changes
  useEffect(() => {
    if (!isBrowser) return

    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userProfile))
    } catch (error) {
      console.error("Error saving user profile to localStorage:", error)
    }
  }, [userProfile])

  // Function to update the profile
  const updateProfile = (newProfileData) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      ...newProfileData
    }))
  }

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook for accessing user context
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 