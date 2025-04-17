import React from "react"
import { useState, useRef, useEffect } from "react"
import EditTransactionDialog from "./EditTransactionDialog"
import { FaLongArrowAltDown, FaLongArrowAltUp, FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [editTransaction, setEditTransaction] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍔",
      Transportation: "🚗",
      Entertainment: "🎬",
      Shopping: "🛒",
      Housing: "🏠",
      Utilities: "💡",
      Healthcare: "🏥",
      Salary: "💼",
      Investment: "📈",
      Gift: "🎁",
      Other: "📦",
    }
    return icons[category] || "📦"
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleEdit = (transaction) => {
    setEditTransaction(transaction)
    setActiveDropdown(null)
  }

  const handleDelete = (id) => {
      onDelete(id)
      setActiveDropdown(null)
  }

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Transactions</h3>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-2">
          <div className="relative flex-1 md:max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              placeholder="Search transactions..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex h-10 w-[130px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex h-10 w-[130px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-4xl">📋</div>
            <h3 className="mt-4 text-lg font-semibold">No transactions found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm || filterType !== "all" || filterCategory !== "all"
                ? "Try changing your search or filters"
                : "Add your first transaction to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type === "income" ? (
                      <span className="flex items-center">
                        <FaLongArrowAltUp />
                        ${transaction.amount.toFixed(2)}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaLongArrowAltDown />
                        ${transaction.amount.toFixed(2)}
                      </span>
                    )}
                  </span>
                  <div className="relative">
                    <button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                      onClick={() => toggleDropdown(transaction._id)}
                    >
                      <BsThreeDotsVertical className="h-5 w-5"/>
                    </button>
                    {activeDropdown === transaction._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                      >
                        <div className="py-1" role="none">
                          <button
                            className="text-gray-700 flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => handleEdit(transaction)}
                          >
                            <FaEdit className="h-5 w-5 mr-2"/>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction._id)}
                            className="text-red-500 flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                          >
                            <MdDelete className="h-5 w-5 mr-2"/>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {editTransaction && (
        <EditTransactionDialog
          transaction={editTransaction}
          onClose={() => setEditTransaction(null)}
          onUpdate={(updatedTransaction) => {
            if (typeof onUpdate === "function") {
              onUpdate(updatedTransaction)
            }
            setEditTransaction(null)
          }}
        />
      )}
    </div>
  )
}