const CustomError = require("../error/customError")
const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      const errorUnAuthorized = new CustomError(
        "token should be in header!",
        401
      )
      next(errorUnAuthorized)
    }
    const token = authorization.split(" ")[1]
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    console.log("verified: ", verified)
    if (!verified) {
      const errorInValid = new CustomError("token is not valid!", 403)
      next(errorInValid)
    }
    next()
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

module.exports = authentication
