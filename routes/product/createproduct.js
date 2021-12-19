const Product = require("../../models/Product.js");
const response = {
  success: true,
  message: "",
};
const createproduct = async (req, res) => {
  const { name, category, price } = req.body;
  let product;
  let createdBy = req.user.id;
  console.log(createdBy);
  product = await Product.create({
    name: name,
    category: category,
    price: price,
    createdBy:createdBy,
  })
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Product added succesfully";
        console.log(response);
        res.json(result);
      } else {
        res.send("Result not found");
      }
    })
    .catch((error) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      res.send(error.message);
    });
};

module.exports = createproduct;
