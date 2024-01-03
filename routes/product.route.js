const express = require("express")
const { productController } = require("../controllers")
const { authentication } = require("../middleware")
const router = express.Router()

router.post("/createProduct", authentication, productController.createProduct)
router.get("/productList", productController.productList)
router.get("/productDetails/:productId", productController.productDetails)
router.put(
  "/updateProduct/:productId",
  authentication,
  productController.updateProduct
)
router.delete("/deleteProduct", authentication, productController.deleteProduct)

module.exports = router
