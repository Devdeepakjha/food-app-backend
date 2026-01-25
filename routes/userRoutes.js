const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getUserController,
  updateUsercontroller,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");

const router = express.Router();

//Router
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUsercontroller);

//PASSWORD UPDATE
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

// DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
