const Blog = require("../models/blogModel")
const User = require("../models/userModel")

const getBlogs = (req, res) => {
  return res.json({ message: "getBlogs" })
}
const addBlog = async (req, res) => {
  try {
    const { id: userId } = req.user
    const user = await User.findById(userId)

    // check if the user exists
    if (!user) return res.status(404).json({ message: "user not foud" })

    const { title, body } = req.body
    const blog = new Blog({ title, body, user: user.id })

    await blog.save()
    return res.status(200).json({ blog })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

module.exports = {
  getBlogs,
  addBlog,
}
