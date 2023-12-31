const express = require("express")
const productRoute = require("./product.route")
const categoryRoute = require("./category.route")
const userRoute = require("./user.route")

const router = express.Router()

router.use("/product", productRoute, categoryRoute)
router.use("/user", userRoute)

module.exports = router
