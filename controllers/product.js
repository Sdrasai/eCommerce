const db = require("../db")

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const { product_name, price, count, CategoryId } = req.body
      const createdProduct = await db.product.create({
        data: {
          product_name,
          price,
          count,
          CategoryId,
        },
      })

      res.status(201).json(createdProduct)
    } catch (error) {
      // console.error("Error creating product:", error)
      // res.status(500).json({ error: "Internal Server Error" })
      next(error)
    }
  },
  productList: async (req, res) => {
    try {
      const { page, count } = req.query
      if (Number(page) === 1) {
        res
          .send(
            await db.product.findMany({
              skip: 0,
              take: Number(count),
              select: { productId: true, product_name: true, price: true },
            })
          )
          .status(200)
      } else {
        res
          .send(
            await db.product.findMany({
              skip: Number(page) * Number(count),
              take: Number(count),
            })
          )
          .status(200)
      }
    } catch (error) {
      console.error("Product List Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  productDetails: async (req, res, next) => {
    try {
      const { productId } = req.params
      const product = await db.product.findUnique({
        where: {
          productId: productId,
        },
      })
      res.send(product).status(200)
    } catch (error) {
      // console.error("Product Details Error:", error)
      // res.status(500).json({ error: "Internal Server Error" })
      next(error)
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { product_name, CategoryId, price, count, category_title } =
        req.body
      const { productId } = req.params

      const newProduct = await db.product.update({
        where: {
          productId: productId,
        },
        data: {
          product_name,
          CategoryId,
          category_title,
          productId,
          price,
          count,
        },
      })
      res.send(newProduct).status(200)
    } catch (error) {
      console.error("Update Product Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.body
      await db.product.deleteMany({
        where: { productId: productId },
      })
      res.json({ message: "Product successfully deleted!" }).status(204)
    } catch (error) {
      console.error("Delete Product Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
}
