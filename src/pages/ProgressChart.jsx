"use client"

import { useState, useEffect } from "react"
import { useWorkouts } from "../context/WorkoutContext"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Activity } from "lucide-react"

function ProgressChart() {
  const { workouts } = useWorkouts()
  const [chartData, setChartData] = useState([])
  const [timeframe, setTimeframe] = useState("week")
  const [chartType, setChartType] = useState("bar")

  useEffect(() => {
    if (workouts.length === 0) return

    // Prepare data based on selected timeframe
    const data = prepareChartData(workouts, timeframe)
    setChartData(data)
  }, [workouts, timeframe])

  const prepareChartData = (workouts, timeframe) => {
    const now = new Date()
    let filteredWorkouts = []
    let dateFormat = {}

    // Filter workouts based on timeframe
    if (timeframe === "week") {
      // Get workouts from the last 7 days
      const oneWeekAgo = new Date(now)
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      filteredWorkouts = workouts.filter((workout) => new Date(workout.date) >= oneWeekAgo)

      dateFormat = { weekday: "short" } // e.g., "Mon"
    } else if (timeframe === "month") {
      // Get workouts from the last 30 days
      const oneMonthAgo = new Date(now)
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)

      filteredWorkouts = workouts.filter((workout) => new Date(workout.date) >= oneMonthAgo)

      dateFormat = { month: "short", day: "numeric" } // e.g., "Jan 15"
    } else if (timeframe === "year") {
      // Get workouts from the last 12 months
      const oneYearAgo = new Date(now)
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

      filteredWorkouts = workouts.filter((workout) => new Date(workout.date) >= oneYearAgo)

      dateFormat = { month: "short" } // e.g., "Jan"
    }

    // Group workouts by date
    const groupedData = {}

    filteredWorkouts.forEach((workout) => {
      const date = new Date(workout.date)
      let dateKey

      if (timeframe === "week") {
        dateKey = date.toLocaleDateString("en-US", dateFormat)
      } else if (timeframe === "month") {
        dateKey = date.toLocaleDateString("en-US", dateFormat)
      } else if (timeframe === "year") {
        dateKey = date.toLocaleDateString("en-US", dateFormat)
      }

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          date: dateKey,
          duration: 0,
          calories: 0,
          count: 0,
        }
      }

      groupedData[dateKey].duration += workout.duration
      groupedData[dateKey].calories += workout.calories
      groupedData[dateKey].count += 1
    })

    // Convert to array and sort by date
    return Object.values(groupedData).sort((a, b) => {
      if (a.date < b.date) return -1
      if (a.date > b.date) return 1
      return 0
    })
  }

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe)
  }

  const handleChartTypeChange = (newType) => {
    setChartType(newType)
  }

  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No workout data available for the selected timeframe.</p>
        </div>
      )
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="duration"
              name="Duration (min)"
              fill="url(#durationGradient)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="calories"
              name="Calories"
              fill="url(#caloriesGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )
    } else {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="duration"
              name="Duration (min)"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="calories"
              name="Calories"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-20">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Your Progress</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Track your workout statistics over time</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
              Workout Statistics
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
                <button
                  onClick={() => handleChartTypeChange("bar")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    chartType === "bar"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => handleChartTypeChange("line")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    chartType === "line"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Line Chart
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
                <button
                  onClick={() => handleTimeframeChange("week")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeframe === "week"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => handleTimeframeChange("month")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeframe === "month"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => handleTimeframeChange("year")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeframe === "year"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>

          {renderChart()}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            Workout Goals
          </h2>

          {workouts.length > 0 ? (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Weekly Activity Goal</h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {Math.min(
                      chartData.reduce((sum, day) => sum + day.count, 0),
                      5,
                    )}{" "}
                    / 5 workouts
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((chartData.reduce((sum, day) => sum + day.count, 0) / 5) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Weekly Duration Goal</h3>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {Math.min(
                      chartData.reduce((sum, day) => sum + day.duration, 0),
                      150,
                    )}{" "}
                    / 150 minutes
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((chartData.reduce((sum, day) => sum + day.duration, 0) / 150) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Weekly Calorie Goal</h3>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    {Math.min(
                      chartData.reduce((sum, day) => sum + day.calories, 0),
                      1000,
                    )}{" "}
                    / 1000 calories
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((chartData.reduce((sum, day) => sum + day.calories, 0) / 1000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Add workouts to track your progress toward goals.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressChart
