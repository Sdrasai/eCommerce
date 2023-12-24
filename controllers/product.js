const db = require("../db")

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { product_name, price, count, catId } = req.body
      const category = await db.category.findUnique({
        where: {
          categoryId: catId,
        },
      })

      if (!category) {
        return res.status(400).json({ error: "Category not found." })
      }

      const createdProduct = await db.product.create({
        data: {
          product_name,
          price,
          count,
          catId,
          category: {
            connect: {
              categoryId: catId,
            },
            select: {
              title: true,
            },
          },
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
}
