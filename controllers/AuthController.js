const UserModel = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res
          .status(404)
          .json({ message: "no user found with the given credentials!!" })

      res.json({ user, message: "success" })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      })
      await newUser.save()
      res.status(201).json({ user: newUser })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },
}
