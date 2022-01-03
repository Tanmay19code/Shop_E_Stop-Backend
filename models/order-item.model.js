const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  productQty: {
    type: Number,
    default: 1,
  },
});

const OrderItem = mongoose.model("order_item", OrderItemSchema);
module.exports = OrderItem;
