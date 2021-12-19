const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
require("dotenv").config({ path: "../.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const response = {
  success: true,
  message: "",
};

// Create new user
const createuser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, primaryAddress } = req.body;
  let user = await User.findOne({ email: email });

  if (user) {
    return res
      .status(400)
      .json({ error: "A user with this email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(password, salt);

  user = await User.create({
    name: name,
    email: email,
    password: securedPassword,
    primaryAddress: primaryAddress,
  })
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "User added succesfully";
        const data = {
          user: {
            id: result.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send({ authtoken });
      }
      console.log(response);
    })
    .catch((error) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      res.send(error.message);
    });
};

// Get the user through header
const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error occured");
  }
};

// user login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      response.success = false;
      response.message = "User not found";
      console.log(response);
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      response.success = false;
      response.message = "Password incorrect";
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
    response.success = true;
    response.message = "Login successfull";
    console.log(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some Internal Server Error occured");
  }
};

module.exports = { createuser, getuser, login };
