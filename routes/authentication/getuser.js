const User = require("../../models/User.js");

const getuser = async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error occured");
    }
  }

  module.exports = getuser;