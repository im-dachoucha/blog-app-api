const router = require("express").Router()
const { getBlogs, addBlog } = require("../controllers/blogController")

router.route("/").get(getBlogs).post(addBlog)

module.exports = router
