const express = require("express")
require("dotenv").config()
// const prisma = require("./db")
const router = require("./routes")

// const { Client } = require("pg")
// const client = new Client()

const app = express()
app.use(express.json())

app.use("/api", router)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
