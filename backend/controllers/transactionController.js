import Transaction from "../models/transactionModel.js"

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      category,
      date,
    })

    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await transaction.deleteOne()
    res.json({ message: "Transaction removed" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body

    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    transaction.title = title || transaction.title
    transaction.amount = amount || transaction.amount
    transaction.type = type || transaction.type
    transaction.category = category || transaction.category
    transaction.date = date || transaction.date

    const updatedTransaction = await transaction.save()
    res.json(updatedTransaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
