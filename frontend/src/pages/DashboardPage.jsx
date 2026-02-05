import React from 'react'
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardHeader from "../components/DashboardHeader"
import TransactionList from "../components/TransactionList"
import AddTransactionDialog from "../components/AddTransactionDialog"
import ExpenseChart from "../components/ExpenseChart"
import MonthlyChart from "../components/MonthlyChart"
import { IoAdd } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("transactions")
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Function to fetch transactions - using useCallback to avoid recreating the function on every render
  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      const response = await fetch(`${API_BASE_URL}/api/transactions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }

      const data = await response.json()
      setTransactions(data)
      return data
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    // Fetch transactions when component mounts
    fetchTransactions()
  }, [fetchTransactions])

  const addTransaction = async (transaction) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) {
        throw new Error("Failed to add transaction")
      }

      fetchTransactions()
    } catch (error) {
      console.error("Error adding transaction:", error)
    }
  }

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete transaction")
      }

      fetchTransactions()
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  const updateTransaction = async (updatedTransaction) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/transactions/${updatedTransaction._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTransaction.title,
          amount: updatedTransaction.amount,
          type: updatedTransaction.type,
          category: updatedTransaction.category,
          date: updatedTransaction.date,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update transaction")
      }

      fetchTransactions()
    } catch (error) {
      console.error("Error updating transaction:", error)
    }
  }

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} onLogout={logout} />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsAddTransactionOpen(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2"
          >
            <IoAdd className='h-5 w-5 mr-2'/>
            Add Transaction
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Total Balance</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Your current balance across all accounts</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Income</h3>
              <FaArrowUp className='h-7 w-7 text-green-500'/>
          
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-green-500">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total income for this period</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Expenses</h3>
              <FaArrowDown className='h-7 w-7 text-red-500'/>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-red-500">${totalExpense.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total expenses for this period</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ${
                  activeTab === "transactions" ? "bg-background text-foreground shadow-sm" : ""
                }`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ${
                  activeTab === "analytics" ? "bg-background text-foreground shadow-sm" : ""
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
            </div>
            <div className="space-y-4">
              {activeTab === "transactions" ? (
                <TransactionList
                  transactions={transactions}
                  onDelete={deleteTransaction}
                  onUpdate={updateTransaction}
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <h3 className="text-lg font-semibold">Expense by Category</h3>
                      <p className="text-sm text-muted-foreground">Breakdown of your expenses by category</p>
                    </div>
                    <div className="p-6 pt-0 h-80">
                      <ExpenseChart transactions={transactions} />
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <h3 className="text-lg font-semibold">Monthly Trend</h3>
                      <p className="text-sm text-muted-foreground">Your income and expense trend over time</p>
                    </div>
                    <div className="p-6 pt-0 h-80">
                      <MonthlyChart transactions={transactions} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
        onAddTransaction={addTransaction}
      />
    </div>
  )
}