const express = require("express");
const router = express.Router();
const createproduct = require("./createproduct.js")
const fetchuser = require("../../middleware/fetchuser")

//Route 1: Create new product : POST "/api/product/createproduct" . login required
router.post('/createproduct',fetchuser,createproduct);

module.exports = router