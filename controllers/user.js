const db = require("../db")

const bc = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
  register: async (req, res) => {
    try {
      const { userName, password, email, age } = req.body
      const salt = await bc.genSalt(10)
      const hashedPassword = await bc.hash(password, salt)

      const user = await db.user.create({
        data: { userName, password: hashedPassword, email, age },
      })
      return res
        .json({
          message: `user ${user.userName} registerd`,
          userId: user.userId,
        })
        .status(201)
    } catch (error) {
      console.log("User Register Error: ", error)
      res.json({ message: "Internal Server Error" }).status(500)
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body
      const user = await db.user.findFirst({ where: { userName } })
      if (!user) {
        throw new Error("Username or password is not correct!")
      }

      const verified = await bc.compare(password, user.password)
      if (!verified) {
        throw new Error("Username or password is not correct!")
      }
      const token = await jwt.sign(
        { userName: user.userName },
        process.env.SECRET_KEY
      )
      return res.json({ token })
    } catch (error) {
      console.log("User Login Error: ", error)
      res.json({ message: "Internal Server Error" }).status(500)
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
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params
      console.log(userId)
      const { userName, password, email, age } = req.body
      const salt = await bc.genSalt(10)
      const hashedPassword = await bc.hash(password, salt)
      const newUser = await db.user.update({
        where: { userId: userId },
        data: {
          userName,
          password: hashedPassword,
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
