const CustomError = require("../error/customError")
const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw new CustomError("token should be in header!", 401)
    }
    const token = authorization.split(" ")[1]
    const verified = jwt.verify(token, process.env.SECRET_KEY)

    if (!verified) {
      throw new CustomError("token is not valid!", 403)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
