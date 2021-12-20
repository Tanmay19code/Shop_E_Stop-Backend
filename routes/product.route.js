const express = require("express");
const router = express.Router();
const {createproduct} = require("../controllers/product.controller.js");
const fetchuser = require("../middlewares/fetchuser.middleware");

//Route 1: Create new product : POST "/api/product/createproduct" . login required
router.post("/createproduct",fetchuser, createproduct);
module.exports = router;
