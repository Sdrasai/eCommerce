const express = require("express")
require("dotenv").config()
const { errorHandler } = require("./middleware/errorHandler")
const { userExist } = require("./middleware/userExist")

const router = require("./routes")

const app = express()
app.use(express.json())

app.use("/api", router)

app.use(userExist)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
