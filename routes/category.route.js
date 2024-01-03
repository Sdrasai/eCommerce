const express = require("express")
const { categoryController } = require("../controllers")
const router = express.Router()
const { authentication } = require("../middleware")

router.post(
  "/createCategory",
  authentication,
  categoryController.createCategory
)
router.put(
  "/updateCategory/:categoryId",
  authentication,
  categoryController.updateCategory
)
router.get("/categoryList", categoryController.categoryList)
router.delete(
  "/deleteCategory",
  authentication,
  categoryController.deleteCategory
)

module.exports = router
