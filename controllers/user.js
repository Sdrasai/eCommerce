const db = require("../db")
const { createToken, hashPassword, comparePassword } = require("../utils")
const bc = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserService = require("../services/user.service")
const userService = new UserService()

module.exports = {
  register: async (req, res, next) => {
    try {
      const { userName, password, email, age } = req.body
      const hashedPassword = await hashPassword(password)
      const user = await userService.createUser(
        userName,
        hashedPassword,
        email,
        age
      )
      res
        .json({
          message: `user ${userName} registerd`,
          userId: user.userId,
        })
        .status(201)
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const { userName, password } = req.body
      const user = await userService.checkingUser(userName, password)
      if (!user) {
        throw new Error("Username or password is not correct!")
      }
      const verified = await comparePassword(password, user.password)
      if (!verified) {
        throw new Error("Username or password is not correct!")
      }
      const token = await createToken(
        { userName },
        process.env.SECRET_KEY,
        process.env.ACCESS_TOKEN_TIME,
        process.env.REFRESH_TOKEN_TIME,
        userName
      )
      return res.json({ token })
    } catch (error) {
      console.log("User Login Error: ", error)
      res.json({ message: "Internal Server Error" }).status(500)
    }
  },
  userList: async (req, res) => {
    try {
      const users = await userService.findUsers()
      res.status(200).json(users)
    } catch (error) {
      console.error("User List Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  userDetails: async (req, res) => {
    try {
      const { userId } = req.params
      const user = await userService.findUserById(userId)
      res.status(200).json(user)
    } catch (error) {
      console.error("User Details Error:", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  },
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params
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
