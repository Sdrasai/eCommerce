const bc = require("bcrypt")

async function comparingPassword(password, checkedPassword) {
  const verified = await bc.compare(password, checkedPassword)
  return verified
}

module.exports = comparingPassword
