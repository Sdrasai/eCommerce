const jwt = require("jsonwebtoken")
const { user } = require("../db")
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
      const user = await db.user.findUnique({ where: { userName } })

      if (user) {
        await db.token.create({
          data: {
            user: userName,
            token: refreshToken,
            user: {
              connect: {
                userName: user.userName,
              },
            },
          },
        })
      }
    }

    return { refreshToken, accessToken }
  } catch (error) {
    throw new Error(error.message)
  }
}
