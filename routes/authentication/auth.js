const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createuser = require("./createuser.js");
const login = require("./login.js");
const getuser = require("./getuser.js");
const fetchuser = require("../../middleware/fetchuser.js");

//Route 1: Create an user using : POST "/api/auth/createuser" . Doesn't require authentication
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast of 5 characters").isLength({
      min: 5,
    }),
    body("primaryAddress", "Address must be atleast of 20 characters").isLength(
      { min: 20 }
    ),
  ],
  createuser
);

//Route 2: User login using : POST "/api/auth/login" . Doesn't require authentication
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast of 5 characters").exists(),
  ],
  login
);

//Route 3: Get logged in user details : POST "/api/auth/getuser" . login required
router.post("/getuser", fetchuser, getuser);

module.exports = router;
