const router = require("express").Router()
const { profile } = require("../controllers/userController")

router.get("/profile", profile)

module.exports = router
