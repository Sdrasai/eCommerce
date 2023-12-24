const express = require("express")
const { productController } = require("../controllers")
const router = express.Router()

router.post("/createProduct", productController.createProduct)
router.get("/productList", productController.productList)
router.get("/productDetails/:productId", productController.productDetails)
router.put("/updateProduct/:productId", productController.updateProduct)

module.exports = router
