"use client"

import { useWorkouts } from "../context/WorkoutContext"
import WorkoutCard from "./WorkoutCard"
import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

function WorkoutList() {
  const { workouts, isLoading, error } = useWorkouts()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
        <p>Error loading workouts: {error}</p>
      </div>
    )
  }

  if (workouts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
          <PlusCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No workouts yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Start tracking your fitness journey by adding your first workout.
        </p>
        <Link
          to="/add"
          className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>Add Your First Workout</span>
        </Link>
      </motion.div>
    )
  }

  // Group workouts by date
  const groupedWorkouts = workouts.reduce((groups, workout) => {
    const date = workout.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(workout)
    return groups
  }, {})

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedWorkouts).sort((a, b) => new Date(b) - new Date(a))

  return (
    <div className="space-y-8">
      {sortedDates.map((date, dateIndex) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dateIndex * 0.1 }}
        >
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100 pl-2 border-l-4 border-indigo-500 dark:border-indigo-400">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupedWorkouts[date].map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default WorkoutList
