const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_item",
    },
  ],

  orderDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
