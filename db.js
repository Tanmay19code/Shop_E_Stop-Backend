const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://tanmay:<password>@shop-e-stop.4kj1m.mongodb.net/test";

const connectToMongoose = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB successfully");
  });
};

module.exports = connectToMongoose;
