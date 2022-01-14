const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createproduct,
  getproduct,
  getallproducts,
  getmyproducts,
  updateproduct,
  deleteproduct,
} = require("../controllers/product.controller.js");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/client/src/backendimages");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("_");
    cb(null, "IMG" + Date.now() + "_" + fileName);
  },
});

const upload = multer({ storage: fileStorageEngine });

const fetchuser = require("../middlewares/fetchuser.middleware");

//Route 1: Create new product : POST "/api/product/createproduct"
// login required
router.post(
  "/createproduct",
  fetchuser,
  upload.single("product_image"),
  // upload.fields([
  //   {
  //     name: "product_image_main",
  //     maxCount: 1
  //   },
  //   {
  //     name: "product_image_array",
  //     maxCount: 5
  //   }
  // ]),
  createproduct
);

//Route 2: Get product : POST "/api/product/createproduct" .
// login not required
router.post("/getproduct/:id", getproduct);

//Route 3: Get all products : POST "/api/product/createproduct" .
// login not required
router.post("/getallproducts/", getallproducts);

//Route 4: Get my products : POST "/api/product/createproduct" .
// login required
router.post("/getmyproducts/", fetchuser, getmyproducts);

//Route 3: Get product : PUT "/api/product/updateproduct" .
// login required
router.put("/updateproduct/:id", fetchuser, updateproduct);

//Route 4: Delete product : DELETE "/api/product/updateproduct" .
// login required
router.delete("/deleteproduct/:id", fetchuser, deleteproduct);

module.exports = router;
