import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/transactions", transactionRoutes)

// Error handler
app.use(errorHandler)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })
