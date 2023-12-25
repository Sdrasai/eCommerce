const db = require("../db")

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { product_name, price, count, catId } = req.body
      const createdProduct = await db.product.create({
        data: {
          product_name,
          price,
          count,
          catId,
        },
      })

      res.status(201).json(createdProduct)
    } catch (error) {
      console.error("Error creating product:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  productList: async (req, res) => {
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
  },
  productDetails: async (req, res) => {
    const { productId } = req.params
    const product = await db.product.findUnique({
      where: {
        productId: productId,
      },
    })
    res.send(product).status(200)
  },
  updateProduct: async (req, res) => {
    const { product_name, catId, price, count, category_title } = req.body
    const { productId } = req.params

    const newProduct = await db.product.update({
      where: {
        productId: productId,
      },
      data: {
        product_name,
        catId,
        category_title,
        productId,
        price,
        count,
      },
    })
    res.send(newProduct).status(200)
  },
  deleteProduct: async (req, res) => {
    const { productId } = req.body
    await db.product.deleteMany({
      where: { productId: productId },
    })
    res.json({ message: "Product successfully deleted!" }).status(204)
  },
}
