const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getUserController } = require("../controllers/userController");

const router = express.Router();

//Router
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

module.exports = router;
