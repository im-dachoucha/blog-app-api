const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(404)
        .json({ message: "no user found with the given credentials!!" })

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user.id),
      message: "success",
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user.id),
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  })
}

module.exports = {
  login,
  register,
}
