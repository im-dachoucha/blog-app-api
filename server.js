require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 3001
const host = process.env.HOST || "localhost"
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "home route" })
})

app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" })
})

app.listen(port, () => {
  console.log(`Server listening on http://${host}:${process.env.PORT}`)
})
