import React from "react"
import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsPersonFill } from "react-icons/bs";
import { TbSettings } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

export default function DashboardHeader({ user, onLogout }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = async () => {
    try {
      const result = await onLogout()
      if (result.success) {
        navigate("/")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const getInitial = () => {
    return user && user.name ? user.name.charAt(0).toUpperCase() : "U"
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="flex items-center" to="/dashboard">
            <span className="text-xl font-bold">ExpenseTracker</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10 bg-emerald-100 text-emerald-800"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-lg font-semibold">{getInitial()}</span>
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <BsPersonFill className='h-5 w-5 mr-2'/>
                      Profile
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <TbSettings className='h-5 w-5 mr-2'/>
                      Settings
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <IoIosLogOut className='h-5 w-5 mr-2'/>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
