const jwt = require("jsonwebtoken")
const db = require("../db")

module.exports = async function createToken(
  payload,
  secretKey,
  refreshExpire,
  accessExpire,
  userName = null
) {
  try {
    const accessToken = jwt.sign(payload, secretKey, {
      expiresIn: accessExpire,
    })
    const refreshToken = jwt.sign(payload, secretKey, {
      expiresIn: refreshExpire,
    })
    if (userName) {
      await db.token.create({
        data: {
          userName: userName,
          token: refreshToken,
        },
      })
    }
    return { refreshToken, accessToken }
  } catch (error) {
    throw new Error(error.message)
  }
}
