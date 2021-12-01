const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../../models/User.js");
require("dotenv").config({ path: "../.env" });
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = require("../../middleware/fetchuser.js");

const response = {
  success: true,
  message: "",
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
        response.success = false
        response.message = "User not found"
        console.log(response);
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        response.success = false
        response.message = "Password incorrect"
        console.log(response);
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });
    response.success = true
    response.message = "Login successfull"
    console.log(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some Internal Server Error occured");
  }
};
module.exports = login;
