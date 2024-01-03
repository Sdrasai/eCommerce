const express = require("express")
const { userController } = require("../controllers")
const router = express.Router()
const { authentication } = require("../middleware")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/userList", authentication, userController.userList)
router.get("/userDetails/:userId", authentication, userController.userDetails)
router.put("/updateUser/:userId", authentication, userController.updateUser)
router.delete("/deleteUser", authentication, userController.deleteUser)

module.exports = router
