import mongoose from "mongoose"

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    type: {
      type: String,
      required: [true, "Please add a type"],
      enum: ["income", "expense"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction
