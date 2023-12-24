const express = require("express")
const { categoryController } = require("../controllers")
const router = express.Router()

router.post("/createCategory", categoryController.createCategory)
router.put("/updateCategory/:categoryId", categoryController.updateCategory)

module.exports = router
