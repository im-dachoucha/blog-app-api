const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const auth = async (req, res, next) => {
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      return res.status(401).json({ message: "not authorized" })
    }
  } else
    return res
      .status(401)
      .json({ message: "not authorized, no token was sent" })
}

module.exports = { auth }
