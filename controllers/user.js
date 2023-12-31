const db = require("../db")

module.exports = {
  createUser: async (req, res) => {
    try {
      const { userName, password, email, age } = req.body
      const user = await db.user.create({
        data: {
          userName,
          password,
          email,
          age,
        },
      })
      res.status(201).json(user)
    } catch (error) {
      console.error("Error Creating User:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  userList: async (req, res) => {
    try {
      const users = await db.user.findMany({
        select: { userId: true, userName: true, email: true },
      })
      res.status(200).json(users)
    } catch (error) {
      console.error("User List Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  userDetails: async (req, res) => {
    try {
      const { userId } = req.params
      const user = await db.user.findUnique({
        where: {
          userId: userId,
        },
      })
      res.status(200).json(user)
    } catch (error) {
      console.error("User Details Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  userUpdate: async (req, res) => {
    try {
      const { userId } = req.params
      console.log(userId)
      const { userName, password, email, age } = req.body
      const newUser = await db.user.update({
        where: { userId: userId },
        data: {
          userName,
          password,
          email,
          age,
        },
      })
      res.status(200).json(newUser)
    } catch (error) {
      console.error("User Update Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.body
      await db.user.deleteMany({
        where: { userId: userId },
      })
      res.json({ message: "User successfully deleted!" }).status(204)
    } catch (error) {
      console.error("User Delete Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
}
