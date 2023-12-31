// const db = require("./db")
// const bc = require("bcrypt")
// const jwt = require("jsonwebtoken")

// module.exports = {
//   register: async (req, res) => {
//     try {
//       const { userName, password, email, age } = req.body
//       const salt = bc.genSalt()
//       const hashedPassword = bc.hashSync(password, salt)

//       const user = await db.user.create({
//         data: { userName, password: hashedPassword, email, age },
//       })
//       return res
//         .json({
//           message: `user${user.userName} registerd`,
//           userId: user.userId,
//         })
//         .status(201)
//     } catch (error) {
//       console.log("User Register Error: ", error)
//       res.json({ message: "Internal Server Error" }).status(500)
//     }
//   },
//   login: async (req, res) => {
//     try {
//       const { userName, password } = req.body
//       const user = await db.user.findFirstOrThrow({ where: { userName } })
//       if (!user) {
//         throw new Error("Username or password is not correct!")
//       }

//       const verified = await bc.compare(user.password, password)
//       if (!verified) {
//         throw new Error("Username or password is not correct!")
//       }
//       const token = await jwt.sign(
//         { userName: user.userName },
//         process.env.SECRET_KEY
//       )
//       return res.json({ token })
//     } catch (error) {
//       console.log("User Login Error: ", error)
//       res.json({ message: "Internal Server Error" }).status(500)
//     }
//   },
// }
