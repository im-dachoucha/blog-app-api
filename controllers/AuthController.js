const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(404)
        .json({ message: "no user found with the given credentials!!" })

    res.json({ user, message: "success" })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()
    res.status(201).json({ user: newUser })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

module.exports = {
  login,
  register,
}
