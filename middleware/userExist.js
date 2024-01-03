const { PrismaClientKnownRequestError } = require("@prisma/client")
const CustomError = require("../error/customError")

module.exports = {
  userExist: (err, req, res, next) => {
    const prismaErrMap = new Map()
    prismaErrMap.set("P2002", "This user already exist! Try another username")
    if (err instanceof PrismaClientKnownRequestError) {
      const errMessage = prismaErrMap.get(err.code)
      const error = new CustomError(errMessage, 400)
      next(error)
    } else {
      const defultError = new CustomError(err.message, 400)
      next(defultError)
    }
  },
}
