// Import mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfuly");
  } catch (error) {
    console.log("database can not connect", error);
  }
};

module.exports = connectDB;