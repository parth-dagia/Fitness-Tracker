// Mock API service to simulate backend operations

// Simulate local storage as our "database"
const STORAGE_KEY = "fitness_tracker_workouts"

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

// Helper to get initial data
const getStoredWorkouts = () => {
  if (!isBrowser) return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }

    // Provide some sample data if nothing exists
    const sampleWorkouts = [
      {
        id: "1",
        type: "Running",
        duration: 30,
        date: "2023-04-15",
        calories: 320,
        notes: "Morning run in the park",
      },
      {
        id: "2",
        type: "Weight Training",
        duration: 45,
        date: "2023-04-14",
        calories: 250,
        notes: "Focused on upper body",
      },
      {
        id: "3",
        type: "Yoga",
        duration: 60,
        date: "2023-04-13",
        calories: 180,
        notes: "Relaxing evening session",
      },
    ]

    // Save the sample data to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleWorkouts))
    return sampleWorkouts
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return []
  }
}

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all workouts
export const fetchWorkouts = async () => {
  if (!isBrowser) return []
  await delay(500) // Simulate network delay
  return getStoredWorkouts()
}

// Add a new workout
export const addWorkout = async (workout) => {
  if (!isBrowser) throw new Error("Cannot add workout on server")
  
  await delay(500)
  try {
    const workouts = getStoredWorkouts()

    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
      calories: calculateCalories(workout.type, workout.duration),
    }

    const updatedWorkouts = [...workouts, newWorkout]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts))

    return newWorkout
  } catch (error) {
    console.error("Error adding workout to localStorage:", error)
    throw new Error("Failed to save workout data")
  }
}

// Delete a workout
export const deleteWorkout = async (id) => {
  if (!isBrowser) throw new Error("Cannot delete workout on server")
  
  await delay(500)
  try {
    const workouts = getStoredWorkouts()
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts))
    return true
  } catch (error) {
    console.error("Error deleting workout from localStorage:", error)
    throw new Error("Failed to delete workout data")
  }
}

// Calculate calories based on workout type and duration
const calculateCalories = (type, duration) => {
  // Simple calorie calculation based on workout type and duration
  let caloriesPerMinute;
  
  switch(type) {
    case "Running":
      caloriesPerMinute = 10;
      break;
    case "Walking":
      caloriesPerMinute = 5;
      break;
    case "Cycling":
      caloriesPerMinute = 8;
      break;
    case "Swimming":
      caloriesPerMinute = 11;
      break;
    case "Weight Training":
      caloriesPerMinute = 7;
      break;
    case "Yoga":
      caloriesPerMinute = 4;
      break;
    case "HIIT":
      caloriesPerMinute = 12;
      break;
    case "Pilates":
      caloriesPerMinute = 5;
      break;
    default:
      caloriesPerMinute = 6;
  }
  
  return Math.floor(caloriesPerMinute * duration);
}

// Get workout statistics
export const getWorkoutStats = async () => {
  if (!isBrowser) return {
    totalWorkouts: 0,
    totalDuration: 0, 
    totalCalories: 0,
    workoutTypes: {}
  }
  
  await delay(300)
  try {
    const workouts = getStoredWorkouts()

    const totalWorkouts = workouts.length
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)

    // Count workout types
    const workoutTypes = {}
    workouts.forEach((workout) => {
      workoutTypes[workout.type] = (workoutTypes[workout.type] || 0) + 1
    })

    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      workoutTypes,
    }
  } catch (error) {
    console.error("Error calculating workout stats:", error)
    return {
      totalWorkouts: 0,
      totalDuration: 0, 
      totalCalories: 0,
      workoutTypes: {}
    }
  }
}
