require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_CS } = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_CS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB connected");
  } catch (error) {
    throw new Error("DB connection error");
  }
};

module.exports = {
  dbConnection,
};
