import React from 'react';
import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function MonthlyChart({ transactions }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const monthlyData = {}

    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = month.toLocaleString("default", { month: "short", year: "numeric" })
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = date.toLocaleString("default", { month: "short", year: "numeric" })

      if (monthlyData[monthKey]) {
        if (transaction.type === "income") {
          monthlyData[monthKey].income += transaction.amount
        } else {
          monthlyData[monthKey].expense += transaction.amount
        }
      }
    })

    const months = Object.keys(monthlyData)
    const incomeData = months.map((month) => monthlyData[month].income)
    const expenseData = months.map((month) => monthlyData[month].expense)

    // Create the chart
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "rgba(16, 185, 129, 0.7)", // emerald-500 with opacity
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 1,
            },
            {
              label: "Expense",
              data: expenseData,
              backgroundColor: "rgba(239, 68, 68, 0.7)", // red-500 with opacity
              borderColor: "rgb(239, 68, 68)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => context.dataset.label + ": $" + context.raw.toFixed(2),
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
