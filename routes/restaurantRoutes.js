const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
} = require("../controllers/restaurantController");

const router = express.Router();

//Router
// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

//  GET ALL RESTAURANTS || GET
router.get("/getAll", getAllRestaurantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getRestaurantByIdController);

module.exports = router;
