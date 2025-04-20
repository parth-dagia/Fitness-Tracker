"use client"

import { useState, useEffect } from "react"
import { User, Bell, Shield, Moon, Sun, Save } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import { motion } from "framer-motion"

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { userProfile, updateProfile } = useUser()
  const [notifications, setNotifications] = useState(true)
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userProfile)
  const [isSaving, setIsSaving] = useState(false)

  // Update form data when userProfile changes
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleToggleNotifications = () => {
    setNotifications(!notifications)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Update the profile with a slight delay to simulate API call
    setTimeout(() => {
      updateProfile(formData)
      setIsEditing(false)
      setIsSaving(false)
    }, 800)
  }

  const fitnessGoals = [
    "Lose weight",
    "Build muscle",
    "Improve endurance",
    "Maintain fitness",
    "Increase flexibility",
    "Train for event",
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto pt-20">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your account and preferences</p>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 flex justify-between items-center">
            <div className="flex items-center">
              <User className="h-5 w-5 text-white mr-2" />
              <h2 className="text-lg font-semibold text-white">Profile</h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-white hover:text-indigo-100 text-sm font-medium transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fitness Goal
                    </label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                      {fitnessGoals.map((goal) => (
                        <option key={goal} value={goal}>
                          {goal}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData(userProfile)
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</h3>
                    <p className="text-gray-900 dark:text-white">{userProfile.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                    <p className="text-gray-900 dark:text-white">{userProfile.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Height</h3>
                    <p className="text-gray-900 dark:text-white">{userProfile.height} cm</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Weight</h3>
                    <p className="text-gray-900 dark:text-white">{userProfile.weight} kg</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Fitness Goal</h3>
                    <p className="text-gray-900 dark:text-white">{userProfile.goal}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600">
            <h2 className="text-lg font-semibold text-white">Preferences</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {darkMode ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-400 rounded-full blur-sm opacity-20"></div>
                    <div className="relative bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-2">
                      <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-sm opacity-20"></div>
                    <div className="relative bg-amber-100 rounded-full p-2">
                      <Sun className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-400 rounded-full blur-sm opacity-20"></div>
                  <div className="relative bg-rose-100 dark:bg-rose-900/30 rounded-full p-2">
                    <Bell className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive workout reminders and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={handleToggleNotifications}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-white mr-2" />
              <h2 className="text-lg font-semibold text-white">Privacy & Data</h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your data is stored locally on your device. This app does not collect or share your personal information.
            </p>

            <button className="px-5 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
              Clear All Workout Data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Settings
