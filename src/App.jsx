"use client";

import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { WorkoutProvider } from "./context/WorkoutContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddWorkout from "./pages/AddWorkout"
import ProgressChart from "./pages/ProgressChart"
import Settings from "./pages/Settings"
import { ThemeProvider } from "./context/ThemeContext"
import { UserProvider } from "./context/UserContext"

function App() {
  // Ensure localStorage is available
  useEffect(() => {
    // Check if localStorage is accessible
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fitness_tracker_test', 'test');
        localStorage.removeItem('fitness_tracker_test');
        console.log('LocalStorage is available and working');
      } catch (error) {
        console.error('LocalStorage is not available:', error);
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <WorkoutProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              <Navbar />
              <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<AddWorkout />} />
                  <Route path="/progress" element={<ProgressChart />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </Router>
        </WorkoutProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
