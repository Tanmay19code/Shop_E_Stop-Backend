const express = require("express");
const router = express.Router();
const {
  addCartItems,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  placeOrder,
  cancelOrder,
  getOrders,
} = require("../controllers/order.controller.js");
const fetchuser = require("../middlewares/fetchuser.middleware");

router.post("/add-cart-items", fetchuser, addCartItems);
router.post("/getcart", fetchuser, getCartItems);
router.put("/update-cart-item/:cartItemId", fetchuser, updateCartItem);
router.post("/delete-cart-item/:cartItemId", fetchuser, deleteCartItem);
router.post("/my-orders", fetchuser, getOrders);
router.post("/place-order", fetchuser, placeOrder);
router.delete("/cancel-order/:cartId", fetchuser, cancelOrder);

module.exports = router;
