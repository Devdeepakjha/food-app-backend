const userModel = require("../models/userModel");

//Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
      //check user is registered or not
      const existing = await userModel.findOne({ email });
      if (existing) {
        return res.status(409).send({
          success: false,
          message: "Email already registered please login!",
        });
      }
    }
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

module.exports = {
  registerController,
};
