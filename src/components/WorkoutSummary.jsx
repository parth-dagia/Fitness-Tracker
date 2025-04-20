"use client"

import { useEffect, useState } from "react"
import { getWorkoutStats } from "../services/api"
import { Activity, Clock, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { useWorkouts } from "../context/WorkoutContext"

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

function WorkoutSummary() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { workouts } = useWorkouts()

  useEffect(() => {
    if (!isBrowser) return
    
    async function loadStats() {
      setLoading(true)
      try {
        const data = await getWorkoutStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to load stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [workouts]) // Re-run when workouts change

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const cards = [
    {
      title: "Total Workouts",
      value: stats.totalWorkouts,
      icon: <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      color: "from-indigo-600 to-violet-600",
      bgLight: "bg-indigo-50",
      bgDark: "dark:bg-indigo-900/20",
    },
    {
      title: "Total Minutes",
      value: stats.totalDuration,
      icon: <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      color: "from-emerald-600 to-teal-600",
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-900/20",
    },
    {
      title: "Calories Burned",
      value: stats.totalCalories,
      icon: <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      color: "from-orange-600 to-amber-600",
      bgLight: "bg-orange-50",
      bgDark: "dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700`}
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className={`rounded-xl ${card.bgLight} ${card.bgDark} p-3 mr-4`}>{card.icon}</div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text ${card.color}`}>
                  {card.value}
                </p>
              </div>
            </div>
          </div>
          <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
        </motion.div>
      ))}
    </div>
  )
}

export default WorkoutSummary
