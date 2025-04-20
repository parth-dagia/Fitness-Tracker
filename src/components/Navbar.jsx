"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Activity, PlusCircle, BarChart2, Settings, Menu, X, User } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"

// Safe check for browser environment
const isBrowser = typeof window !== 'undefined'

function Navbar() {
  const location = useLocation()
  const { darkMode } = useTheme()
  const { userProfile } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isBrowser) return
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Activity className="h-5 w-5" /> },
    { path: "/add", label: "Add Workout", icon: <PlusCircle className="h-5 w-5" /> },
    { path: "/progress", label: "Progress", icon: <BarChart2 className="h-5 w-5" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-sm opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-2">
                  <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                FitTrack
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex space-x-1 mr-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/settings" 
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-2">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-medium text-sm">{userProfile.name}</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-16 w-64 bg-white dark:bg-gray-900 h-screen shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <Link
                to="/settings"
                className="flex items-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-2">
                  <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-medium">{userProfile.name}</span>
              </Link>
            </div>
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg flex items-center ${
                    isActive(item.path)
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden z-30">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center ${
                isActive(item.path) ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
