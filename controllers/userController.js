const userModel = require("../models/userModel");

//GET USER INFO.
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

//UPDATE USER
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

module.exports = {
  getUserController,
  updateUsercontroller,
};
