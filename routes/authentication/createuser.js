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
module.exports = createuser;