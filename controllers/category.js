const { category } = require("../db")
const db = require("../db")

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { title, parentId } = req.body
      const createdCategory = await db.category.create({
        data: {
          title,
          parentId,
        },
      })

      res.status(201).json(createdCategory)
    } catch (error) {
      console.error("Error creating category:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  categoryList: async (req, res) => {
    // const { title, parentId } = req.body
    const categories = await db.category.findMany({
      select: { title: true, parentId: true, categoryId: true },
    })
    res.send(categories).status(200)
  },

  updateCategory: async (req, res) => {
    const { title, parentId } = req.body
    const { categoryId } = req.params
    const newCategory = await db.category.update({
      where: { categoryId: categoryId },
      data: {
        title,
        parentId,
      },
    })
    res.send(newCategory).status(200)
  },
  deleteCategory: async (req, res) => {
    const { categoryId } = req.body
    await db.category.deleteMany({
      where: { categoryId: categoryId },
    })
    res.json({ message: "Category successfully deleted!" }).status(204)
  },
}
