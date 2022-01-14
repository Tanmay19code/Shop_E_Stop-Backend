const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  highlights: {
    type: [],
  },
  specifications: {
    type: [
      {
        key: "",
        value: "",
      },
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  ranking: {
    type: Number,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
