const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer, usertype } =
      req.body;
    //validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //check user is registered or not
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already registered please login!",
      });
    }
    //hashing passworwd
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
      usertype,
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

//Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide email or passsword",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //checking user password || comapring the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
