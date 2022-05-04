require("dotenv").config()

const express = require("express")
const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
const { auth } = require("./middlewares/authMiddleware")

// ? env variables
const port = process.env.PORT || 3001
const host = process.env.HOST || "localhost"
const mongoose = require("mongoose")

// ? connection to the database
mongoose.connect(process.env.MONGODB_URI)

// ? to ensure the connection to the database
mongoose.connection.once("open", () => {
  console.log("connected to the database")
})

// ? to parse incoming requests with json payload
app.use(express.json())

app.use(cors())

// * different routes

app.get("/", auth, (req, res) => {
  res.json({ user: req.user, message: "home route" })
})

// ? auth routes
app.use("/auth", authRoutes)

// ? user routes

app.use("/user", auth, userRoutes)

// ? to catch undefined routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" })
})

app.listen(port, () => {
  console.log(`Server listening on http://${host}:${process.env.PORT}`)
})
