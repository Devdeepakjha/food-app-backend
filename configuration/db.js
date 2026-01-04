const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Database ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log("DataBase Error", error.bgRed);
  }
};

module.exports = connectDb;
