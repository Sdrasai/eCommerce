const bc = require("bcrypt")

async function hashPassword(password) {
  const salt = await bc.genSalt(10)
  const hashedPassword = await bc.hash(password, salt)
  return hashedPassword
}

module.exports = hashPassword
