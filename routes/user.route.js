const express = require("express")
const { userController } = require("../controllers")
const router = express.Router()

router.post("/createUser", userController.createUser)
router.get("/userList", userController.userList)
router.get("/userDetails/:userId", userController.userDetails)
router.put("/updateUser/:userId", userController.userUpdate)
router.delete("/deleteUser", userController.deleteUser)

module.exports = router
