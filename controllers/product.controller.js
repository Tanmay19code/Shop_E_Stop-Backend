const Product = require("../models/product.model.js");
const fs = require("fs");

// object for response in console
const response = {
  success: true,
  message: "",
};

// controller for create product
const createproduct = async (req, res) => {
  const { name, category, price } = req.body;
  const reqFile = req.files.product_image_main[0];
  // console.log(req.files.product_image_main);
  let productImage;
  const reqFiles = req.files.product_image_array;
  const maxImgSize = 1000000;
  const imageType = ["image/png", "image/jpeg", "image/jpg"];
  // const imageSize = reqFile.size;

  // const productImage = `http://localhost:5000/images/${reqFile.filename}`;

  // if (!imageType.includes(reqFile.mimetype)) {
  //   response.success = false;
  //   response.message =
  //     "File format not supported. Image with extension .png, .jpg, .jpeg supported";
  //   console.log(response);
  //   /****To delete image when format is not supported****/
  //   fs.unlink(`./images/${reqFile.filename}`, (err) => {
  //     if (err) {
  //       console.log(err.message);
  //       return res.send({ message: err.message });
  //     }
  //   });
  //   return res.status(415).send({
  //     message:
  //       "File format not supported. Image with extension .png, .jpg, .jpeg supported",
  //   });
  // }

  // if (imageSize > maxImgSize) {
  //   response.success = false;
  //   response.message =
  //     "File size exceeded. Maximum size allowed :" + maxImgSize;
  //   console.log(response);
  //   /****To delete image when size is exceeded****/
  //   fs.unlink(`./images/${reqFile.filename}`, (err) => {
  //     if (err) {
  //       console.log(err.message);
  //       return res.send({ message: err.message });
  //     }
  //   });
  //   return res.status(415).send({
  //     message: "File size exceeded. Maximum size allowed :" + maxImgSize,
  //   });
  // }

  const validation = (image) => {
    if (!imageType.includes(image.mimetype)) {
      response.success = false;
      response.message =
        "File format not supported. Image with extension .png, .jpg, .jpeg supported";
      console.log(response);
      /****To delete image when format is not supported****/
      fs.unlink(`./images/${image.filename}`, (err) => {
        if (err) {
          console.log(err.message);
          return res.send({ message: err.message });
        }
      });
      return res.status(415).send({
        message:
          "File format not supported. Image with extension .png, .jpg, .jpeg supported",
      });
    } else if (image.size > maxImgSize) {
      response.success = false;
      response.message =
        "File size exceeded. Maximum size allowed :" + maxImgSize;
      console.log(response);
      /****To delete image when size is exceeded****/
      fs.unlink(`./images/${image.filename}`, (err) => {
        if (err) {
          console.log(err.message);
          return res.send({ message: err.message });
        }
      });
      return res.status(415).send({
        message: "File size exceeded. Maximum size allowed :" + maxImgSize,
      });
    } else {
      return true;
    }
  };

  if (validation(reqFile)) {
    productImage = `http://localhost:5000/images/${reqFile.filename}`;
  } else {
    console.log("File validation failed");
  }

  for (let index = 0; index < reqFiles.length; index++) {
    const element = reqFiles[index];
    validation(element)
  }
  let createdBy = req.user.id;
  await Product.create({
    name: name,
    image: productImage,
    // image_array:
    category: category,
    price: price,
    createdBy: createdBy,
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

// controller for get product
const getproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    // .populate("createdBy");
    response.success = true;
    response.message = "Product retrieved succesfully";
    console.log(response);
    res.send(product);
  } catch (err) {
    response.success = false;
    response.message = "Some error occured";
    console.log(response);
    res.status(500).send("Error occured");
  }
};

// controller for get all products
const getallproducts = async (req, res) => {
  try {
    await Product.find({})
      .select("-createdBy")
      .then((result) => {
        if (result) {
          res.send({
            productCount: result.length,
            products: result,
          });
          response.success = true;
          response.message = "Products retrieved succesfully";
          console.log(response);
        }
      })
      .catch((err) => {
        response.success = false;
        response.message = "Some error occured";
        console.log(response);
        return res.status(500).send(err.message);
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error occured");
  }
};

// controller for get my products
const getmyproducts = async (req, res) => {
  const userId = req.user.id;
  // console.log(userId);
  await Product.find({ createdBy: userId })
    .then((result) => {
      if (result) {
        res.send({
          myProductCount: result.length,
          myProducts: result,
        });
        response.success = true;
        response.message = " MyProducts retrieved succesfully";
        console.log(response);
      }
    })

    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      return res.status(500).send(err.message);
    });
};

// controller for update products
const updateproduct = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const { name, category, description, price } = req.body;
  const updatedProduct = {
    name: name,
    category: category,
    description: description,
    price: price,
  };
  await Product.findOne({ _id: productId })
    .then(async (result) => {
      if (result) {
        if (result.createdBy != userId) {
          response.success = false;
          response.message = "User not allowed to access this product";
          console.log(response);
          return res.status(404).send("Action not allowed");
        }
        await Product.findOneAndUpdate(
          { _id: productId },
          { $set: updatedProduct },
          { new: true }
        )
          .then((updateResult) => {
            if (updateResult) {
              res.status(200).send({
                updatedProduct: updateResult,
                message: "Product updated successfully",
              });
              response.success = true;
              response.message = "Product updated succesfully";
              console.log(response);
            }
          })
          .catch((err) => {
            response.success = false;
            response.message = "Some error occured";
            console.log(response);
            return res.status(500).send(err.message);
          });
      } else {
        response.success = false;
        response.message = "No product found";
        console.log(response);
        return res.status(404).send("No such product exist");
      }
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      return res.status(500).send(err.message);
    });
};

// controller for delete products
const deleteproduct = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  await Product.findOne({ _id: productId })
    .then(async (result) => {
      if (result) {
        if (result.createdBy != userId) {
          response.success = false;
          response.message = "User not allowed to access this product";
          console.log(response);
          return res.status(404).send("Action not allowed");
        }
        await Product.findOneAndDelete({ _id: productId })
          .then((deleteResult) => {
            if (deleteResult) {
              res.status(200).send({
                deletedProduct: deleteResult,
                message: "Product deleted successfully",
              });
              response.success = true;
              response.message = "Product deleted succesfully";
              console.log(response);
            }
          })
          .catch((err) => {
            response.success = false;
            response.message = "Some error occured";
            console.log(response);
            return res.status(500).send(err.message);
          });
      } else {
        response.success = false;
        response.message = "No product found";
        console.log(response);
        return res.status(404).send("No such product exist");
      }
    })
    .catch((err) => {
      response.success = false;
      response.message = "Some error occured";
      console.log(response);
      return res.status(500).send(err.message);
    });
};

module.exports = {
  createproduct,
  getproduct,
  getallproducts,
  getmyproducts,
  updateproduct,
  deleteproduct,
};
