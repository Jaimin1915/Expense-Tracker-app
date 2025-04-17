import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        },
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token is valid" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
