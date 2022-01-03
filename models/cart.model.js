const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_item",
    },
  ],
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
