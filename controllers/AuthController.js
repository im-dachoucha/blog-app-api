const UserModel = require("../models/User")

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email, password })
      if (!user)
        return res
          .status(404)
          .json({ user, message: "no user found with the given credentials!!" })
      res.json({ user, message: "success" })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
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
