const db = require("../db")

class UserService {
  db = db
  async createUser(userName, hashedPassword, email, age) {
    return await db.user.create({
      data: { userName, password: hashedPassword, email, age },
    })
  }
  async checkingUser(userName, password) {
    const user = await db.user.findFirst({ where: { userName } })
    return user
  }
  async findUsers() {
    return await db.user.findMany({
      select: { userId: true, userName: true, email: true },
    })
  }
  async findUserById(userId) {
    return await db.user.findUnique({
      where: {
        userId: userId,
      },
    })
  }
}

module.exports = UserService
