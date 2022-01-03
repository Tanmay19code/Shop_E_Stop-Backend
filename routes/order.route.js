const express = require("express");
const router = express.Router();
const {
  addCartItems,
  getCartItems,
} = require("../controllers/order.controller.js");
const fetchuser = require("../middlewares/fetchuser.middleware");

router.post("/add-cart-items", fetchuser, addCartItems);
router.get("/getcart", fetchuser, getCartItems);

module.exports = router;
