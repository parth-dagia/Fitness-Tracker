"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { fetchWorkouts, addWorkout, deleteWorkout } from "../services/api"

const WorkoutContext = createContext()

const initialState = {
  workouts: [],
  isLoading: false,
  error: null,
}

function workoutReducer(state, action) {
  switch (action.type) {
    case "FETCH_WORKOUTS_START":
      return { ...state, isLoading: true, error: null }
    case "FETCH_WORKOUTS_SUCCESS":
      return { ...state, workouts: action.payload, isLoading: false }
    case "FETCH_WORKOUTS_ERROR":
      return { ...state, error: action.payload, isLoading: false }
    case "ADD_WORKOUT_SUCCESS":
      return { ...state, workouts: [...state.workouts, action.payload] }
    case "DELETE_WORKOUT_SUCCESS":
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout.id !== action.payload),
      }
    default:
      return state
  }
}

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState)

  // Load data from API on mount
  useEffect(() => {
    // Skip during SSR
    if (!isBrowser) return
    
    async function getWorkouts() {
      dispatch({ type: "FETCH_WORKOUTS_START" })
      try {
        const data = await fetchWorkouts()
        dispatch({ type: "FETCH_WORKOUTS_SUCCESS", payload: data })
      } catch (error) {
        console.error("Error fetching workouts:", error)
        dispatch({ type: "FETCH_WORKOUTS_ERROR", payload: error.message || "Failed to load workouts" })
      }
    }

    getWorkouts()
  }, [])

  const addNewWorkout = async (workout) => {
    try {
      const newWorkout = await addWorkout(workout)
      dispatch({ type: "ADD_WORKOUT_SUCCESS", payload: newWorkout })
      return newWorkout
    } catch (error) {
      console.error("Error adding workout:", error)
      dispatch({ type: "FETCH_WORKOUTS_ERROR", payload: error.message || "Failed to add workout" })
      throw error
    }
  }

  const removeWorkout = async (id) => {
    try {
      await deleteWorkout(id)
      dispatch({ type: "DELETE_WORKOUT_SUCCESS", payload: id })
    } catch (error) {
      console.error("Error deleting workout:", error)
      dispatch({ type: "FETCH_WORKOUTS_ERROR", payload: error.message || "Failed to delete workout" })
      throw error
    }
  }

  return (
    <WorkoutContext.Provider
      value={{
        ...state,
        addWorkout: addNewWorkout,
        deleteWorkout: removeWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkouts() {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider")
  }
  return context
}
