const CustomError = require("../error/customError")

module.exports = {
  errorHandler: (err, req, res, next) => {
    if (err instanceof CustomError) {
      return res.status(err.code).json({
        status: "error",
        error: err.code,
        message: err.message,
      })
    }
    return res.json({
      status: "error",
      message: err.message,
    })
  },
}
