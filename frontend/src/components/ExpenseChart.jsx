import React from "react"
import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function ExpenseChart({ transactions }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Filter only expense transactions
    const expenseTransactions = transactions.filter((t) => t.type === "expense")

    const expensesByCategory = {}
    expenseTransactions.forEach((transaction) => {
      if (expensesByCategory[transaction.category]) {
        expensesByCategory[transaction.category] += transaction.amount
      } else {
        expensesByCategory[transaction.category] = transaction.amount
      }
    })

    const categories = Object.keys(expensesByCategory)
    const amounts = Object.values(expensesByCategory)

    const backgroundColors = [
      "#10b981", // emerald-500
      "#0ea5e9", // sky-500
      "#8b5cf6", // violet-500
      "#ec4899", // pink-500
      "#f59e0b", // amber-500
      "#ef4444", // red-500
      "#6366f1", // indigo-500
      "#84cc16", // lime-500
      "#14b8a6", // teal-500
      "#f97316", // orange-500
    ]

    // Create the chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: categories,
          datasets: [
            {
              data: amounts,
              backgroundColor: backgroundColors.slice(0, categories.length),
              borderWidth: 1,
              borderColor: "#ffffff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 15,
                padding: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${value.toFixed(2)} (${percentage}%)`
                },
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [transactions])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
