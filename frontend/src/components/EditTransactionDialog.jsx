import React from "react"
import { useState } from "react"

export default function EditTransactionDialog({ transaction, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    date: new Date(transaction.date).toISOString().split("T")[0],
  })
  const [errors, setErrors] = useState({})

  const categories = {
    expense: ["Food", "Transportation", "Entertainment", "Shopping", "Housing", "Utilities", "Healthcare", "Other"],
    income: ["Salary", "Investment", "Gift", "Other"],
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const updatedTransaction = {
      ...transaction,
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: new Date(formData.date),
    }

    onUpdate(updatedTransaction)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold">Edit Transaction</h2>
          <p className="text-sm text-gray-500">Update the details of your transaction.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium leading-none">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Grocery shopping"
                className={`flex h-10 w-full rounded-md border ${
                  errors.title ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium leading-none">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`flex h-10 w-full rounded-md border ${
                  errors.amount ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              />
              {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="type" className="text-sm font-medium leading-none">
                Type
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleSelectChange("type", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium leading-none">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleSelectChange("category", e.target.value)}
                className={`flex h-10 w-full rounded-md border ${
                  errors.category ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <option value="">Select category</option>
                {formData.type === "expense"
                  ? categories.expense.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  : categories.income.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium leading-none">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`flex h-10 w-full rounded-md border ${
                  errors.date ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              />
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-10 px-4 py-2"
            >
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
