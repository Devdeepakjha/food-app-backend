const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO.
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.userId }, { _id: 0 });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // hide password
    user.password = undefined;
    // sending response
    res.status(200).send({
      success: true,
      message: "User data fetched successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

// UPDATE USER
const updateUsercontroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.userId });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save the user now
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.userId });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }
    //check password || compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing the newpassword
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(401).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(402).send({
        success: false,
        message: "User Not Found or Invalid answer",
      });
    }
    //hashing the new password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {}
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in Password Reset APIs",
    error,
  });
};

// DELETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your Account has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profie API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUsercontroller,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
