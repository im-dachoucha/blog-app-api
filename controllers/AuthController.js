const UserModel = require("../models/User")

module.exports = {
  login: (req, res) => {
    res.json({ message: "login route" })
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body
      const newUser = new UserModel({ username, email, password })
      await newUser.save()
      res.status(201).json({ user: newUser })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },
}
