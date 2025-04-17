import React from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { GoArrowRight } from "react-icons/go";
import { FaRegHeart, FaRupeeSign, FaHistory } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { SiPagespeedinsights } from "react-icons/si";

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <span className="text-xl font-bold">ExpenseTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {user ? (
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="text-sm font-medium hover:bg-gray-100 px-3 py-1 rounded-md transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1 rounded-md transition-colors">
                  Register
                </button>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Expenses with Ease
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Gain control of your finances. Track expenses, visualize spending patterns, and make informed
                    financial decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2">
                      Get Started
                      <GoArrowRight className='h-4 w-5 ml-2'/>
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                      Login to Your Account
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 shadow-lg">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Your Balance</h3>
                        <span className="text-2xl font-bold text-emerald-600">$2,450.85</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Income</p>
                          <p className="text-lg font-semibold text-green-600">$4,250.00</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Expenses</p>
                          <p className="text-lg font-semibold text-red-600">$1,799.15</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
                      <h3 className="font-semibold text-lg mb-3">Recent Transactions</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-blue-600 text-xs">🛒</span>
                            </div>
                            <div>
                              <p className="font-medium">Grocery Shopping</p>
                              <p className="text-xs text-gray-500">Apr 12, 2023</p>
                            </div>
                          </div>
                          <span className="text-red-600 font-medium">-$85.20</span>
                        </div>
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                              <span className="text-purple-600 text-xs">💼</span>
                            </div>
                            <div>
                              <p className="font-medium">Salary Deposit</p>
                              <p className="text-xs text-gray-500">Apr 1, 2023</p>
                            </div>
                          </div>
                          <span className="text-green-600 font-medium">+$2,750.00</span>
                        </div>
                        <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                              <span className="text-yellow-600 text-xs">🍔</span>
                            </div>
                            <div>
                              <p className="font-medium">Restaurant</p>
                              <p className="text-xs text-gray-500">Mar 28, 2023</p>
                            </div>
                          </div>
                          <span className="text-red-600 font-medium">-$42.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to take control of your finances
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <FaRegHeart className=''/>
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-sm text-gray-500 text-center">
                  Easily log your daily expenses and income with detailed categorization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <IoAnalyticsSharp className=''/>
                </div>
                <h3 className="text-xl font-bold">Visual Analytics</h3>
                <p className="text-sm text-gray-500 text-center">
                  Visualize your spending patterns with interactive charts and graphs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <FaRupeeSign className=''/>
                </div>
                <h3 className="text-xl font-bold">Budget Management</h3>
                <p className="text-sm text-gray-500 text-center">
                  Set budgets for different categories and track your progress.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <MdOutlineSecurity className=''/>
                </div>
                <h3 className="text-xl font-bold">Secure Authentication</h3>
                <p className="text-sm text-gray-500 text-center">
                  Your financial data is protected with secure authentication.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <FaHistory className=''/>
                </div>
                <h3 className="text-xl font-bold">Transaction History</h3>
                <p className="text-sm text-gray-500 text-center">
                  Access and search your complete transaction history anytime.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-emerald-100 p-3">
                <SiPagespeedinsights className=''/>
                </div>
                <h3 className="text-xl font-bold">Financial Insights</h3>
                <p className="text-sm text-gray-500 text-center">
                  Get personalized insights to improve your financial habits.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 ExpenseTracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
