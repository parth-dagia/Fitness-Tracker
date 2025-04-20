"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWorkouts } from "../context/WorkoutContext"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Clock, Calendar, FileText, Dumbbell } from "lucide-react"

function AddWorkout() {
  const navigate = useNavigate()
  const { addWorkout } = useWorkouts()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const workoutTypes = [
    "Running",
    "Walking",
    "Cycling",
    "Swimming",
    "Weight Training",
    "Yoga",
    "HIIT",
    "Pilates",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.type) {
      newErrors.type = "Please select a workout type"
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required"
    } else if (isNaN(formData.duration) || Number(formData.duration) <= 0) {
      newErrors.duration = "Duration must be a positive number"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await addWorkout({
        ...formData,
        duration: Number(formData.duration),
      })
      navigate("/")
    } catch (error) {
      console.error("Failed to add workout:", error)
      setErrors({ submit: "Failed to add workout. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto pt-20">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Add New Workout</h1>
        </div>

        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-4">
            <p>{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label
                className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="type"
              >
                <Dumbbell className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                Workout Type*
              </label>
              <div
                className={`relative rounded-lg border ${
                  errors.type ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-3 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg appearance-none"
                >
                  <option value="">Select a workout type</option>
                  {workoutTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div>
              <label
                className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="duration"
              >
                <Clock className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                Duration (minutes)*
              </label>
              <div
                className={`relative rounded-lg border ${
                  errors.duration ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  placeholder="Enter duration in minutes"
                  className="block w-full px-3 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                />
              </div>
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label
                className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="date"
              >
                <Calendar className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                Date*
              </label>
              <div
                className={`relative rounded-lg border ${
                  errors.date ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                />
              </div>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label
                className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="notes"
              >
                <FileText className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                Notes (optional)
              </label>
              <div className="relative rounded-lg border border-gray-300 dark:border-gray-600">
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add any additional notes about your workout"
                  className="block w-full px-3 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 mr-3 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSubmitting ? "Saving..." : "Save Workout"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default AddWorkout
