"use client"

import { useState } from "react"
import { Trash2, Clock, Flame, ChevronDown, ChevronUp } from "lucide-react"
import { useWorkouts } from "../context/WorkoutContext"
import { motion } from "framer-motion"

// Map workout types to emoji icons
const workoutIcons = {
  Running: "🏃",
  Walking: "🚶",
  Cycling: "🚴",
  Swimming: "🏊",
  "Weight Training": "🏋️",
  Yoga: "🧘",
  HIIT: "⚡",
  Pilates: "🤸",
  Other: "🏆",
}

function WorkoutCard({ workout }) {
  const { deleteWorkout } = useWorkouts()
  const [expanded, setExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteWorkout(workout.id)
    } catch (error) {
      console.error("Failed to delete workout:", error)
      setIsDeleting(false)
    }
  }

  // Format date to be more readable
  const formattedDate = new Date(workout.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  // Get icon for workout type or default to 'Other'
  const icon = workoutIcons[workout.type] || workoutIcons["Other"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-2xl">
              {icon}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{workout.type}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{formattedDate}</p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
            aria-label="Delete workout"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-medium">{workout.duration} min</p>
            </div>
          </div>
          <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
              <p className="font-medium">{workout.calories} kcal</p>
            </div>
          </div>
        </div>

        {workout.notes && (
          <div className="mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide notes
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show notes
                </>
              )}
            </button>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-300"
              >
                {workout.notes}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default WorkoutCard
