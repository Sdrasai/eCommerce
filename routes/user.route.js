const express = require("express")
const { userController } = require("../controllers")
const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/userList", userController.userList)
router.get("/userDetails/:userId", userController.userDetails)
router.put("/updateUser/:userId", userController.updateUser)
router.delete("/deleteUser", userController.deleteUser)

module.exports = router
