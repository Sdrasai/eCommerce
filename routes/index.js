const express = require("express")
const productRoute = require("./product.route")
const categoryRoute = require("./category.route")

const router = express.Router()

router.use("/product", productRoute, categoryRoute)

module.exports = router
