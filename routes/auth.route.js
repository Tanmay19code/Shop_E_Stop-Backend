const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// const createuser = require("./authentication/createuser.js");
// const login = require("./authentication/login.js");
// const getuser = require("./authentication/getuser.js");
const {
  createuser,
  login,
  getuser,
} = require("../controllers/auth.controller");
const fetchuser = require("../middlewares/fetchuser.middleware.js");

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
