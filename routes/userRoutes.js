const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getUserController,
  updateUsercontroller,
} = require("../controllers/userController");

const router = express.Router();

//Router
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUsercontroller);

module.exports = router;
