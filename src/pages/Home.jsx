"use client"

import WorkoutSummary from "../components/WorkoutSummary"
import WorkoutList from "../components/WorkoutList"
import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="pt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Workout Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your fitness journey</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>Add Workout</span>
        </Link>
      </div>

      <WorkoutSummary />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Workouts</h2>
        <WorkoutList />
      </div>
    </motion.div>
  )
}

export default Home
