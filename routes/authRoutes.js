const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

//!Swagger comment for register and login API
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register User
 *     description: Creates a new user account and stores user details in database
 *     responses:
 *       201:
 *         description: User Registered Successfully
 */
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login User
 *     description: Authenticates user and returns JWT token
 *     responses:
 *       200:
 *         description: Login Successful
 */

//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

module.exports = router;
