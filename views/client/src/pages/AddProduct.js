import React, { useState } from "react";
// import laptop from "../images/laptop1.jpg";
import uploadImage from "../images/upload.png";
// import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions/productActions.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const dispatch = useDispatch(null);
  const navigate = useNavigate();

  var loadFile = function (event) {
    var image = document.getElementById("output-display");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  // const [highlights, setHighlights] = useState([])
  let auxArray = [];
  let auxObj = { key: "", value: "" };
  const [highlights, setHighlights] = useState([]);
  const [specifications, setSpecifications] = useState([{}]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    ranking: 0,
    price: 0,
  });
  // console.log(highlights);

  const onHighlightsChange = (index) => (e) => {
    auxArray = [...highlights];
    auxArray[index] = e.target.value;
    setHighlights(auxArray);
    console.log(highlights);
  };

  const onSpecificationsChange = (input, index) => (e) => {
    auxArray = [...specifications];
    auxObj = auxArray[index] || auxObj;
    if (input == "key") {
      auxObj.key = e.target.value;
    } else if (input == "value") {
      auxObj.value = e.target.value;
    }
    auxArray[index] = auxObj;
    setSpecifications(auxArray);
    console.log(specifications);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProduct(formData, highlights, specifications))
      .then(() => {
        toast.success("Product Added Successfully");
        setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        }, 3000);
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 3);
      })
      .catch((err) => {
        console.log("ERROR =>", err.message);
      });
  };

  return (
    <form
      method="POST"
      className="page-container product-container"
      onSubmit={(e) => onSubmit(e)}
    >
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        closeOnClickrtl={true}
      />
      <div className="product-container-left">
        <div className="product-header">
          <div className="product-image-div">
            <img src={uploadImage} id="output-display" alt="Upload photo" />
            <br />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={loadFile}
            />
            {/* <p className ="product-image-price mobile-display">₹65,000</p> */}
            <input
              className="mobile-display"
              type="number"
              placeholder="Enter amount in INR"
              onChange={(e) => onChange(e)}
              name="price"
              // required
              // value={formData.price}
            />
            <input
              type="text"
              placeholder="category"
              className="mobile-display price-input"
              onChange={(e) => onChange(e)}
              name="category"
              // required
              value={formData.category}
            />
          </div>
          <div className="product-info">
            <div className="product-title">
              {/* <p id="product-info-heading">Dell Inspiron 352</p> */}
              <input
                id="product-info-heading-input"
                placeholder="Enter the product title"
                onChange={(e) => onChange(e)}
                name="name"
                required
                value={formData.email}
              />
              {/* <div className="rating"> */}
              {/* <AiFillStar /> */}
              {/* <p>4.2</p> */}
              <input
                type="number"
                placeholder="ranking"
                id="ranking-input"
                onChange={(e) => onChange(e)}
                name="ranking"
                // value={formData.ranking}
              />
              {/* </div> */}
            </div>
            <div className="product-title-description mobile-display">
              <ul>
                <li>Core i3 10th Gen</li>
                <li>8 GB/1 TB HDD</li>
                <li>Windows 10 Home</li>
                <li>15.6 inch, Black, With MS Office</li>
              </ul>
            </div>

            {/* <p className="product-image-price laptop-display">₹65,000</p> */}
            <input
              className="laptop-display price-input"
              type="number"
              placeholder="Enter amount in INR"
              onChange={(e) => onChange(e)}
              name="price"
              required
              // value={formData.price}
            />
            <input
              type="text"
              placeholder="category"
              className="laptop-display price-input"
              onChange={(e) => onChange(e)}
              name="category"
              required
              value={formData.category}
            />
            <div className="product-title-buttons"></div>
          </div>
        </div>
      </div>
      <div className="product-container-right">
        <div className="laptop-display">
          <textarea
            cols="60"
            rows="8"
            placeholder="Enter brief description here"
            maxLength="100"
            className="description-input"
            onChange={(e) => onChange(e)}
            name="description"
            required
            value={formData.description}
          />
        </div>
        <div className="product-details-description">
          <hr />
          <p id="product-details-header">Highlights :</p>
          <div className="highlights">
            <input id="highlight1" onChange={onHighlightsChange(0)} />
            <br />
            <input id="highlight2" onChange={onHighlightsChange(1)} />
            <br />
            <input id="highlight3" onChange={onHighlightsChange(2)} />
            <br />
            <input id="highlight4" onChange={onHighlightsChange(3)} />
            <br />
            <input id="highlight5" onChange={onHighlightsChange(4)} />
            <br />
            <br />
          </div>
        </div>

        <div className="product-details-description">
          <hr />
          <p id="product-details-header">Specifications :</p>
          <div className="add-specifications">
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 0)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 0)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 1)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 1)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 2)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 2)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 3)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 3)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 4)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 4)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 5)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 5)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 6)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 6)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 7)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 7)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 8)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 8)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 9)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 9)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 10)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 10)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 11)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 11)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 12)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 12)}
              />
            </div>
            <div className="add-specifications-item">
              <input
                className="add-specifications-item-key"
                onChange={onSpecificationsChange("key", 13)}
              />
              <input
                className="add-specifications-item-value"
                onChange={onSpecificationsChange("value", 13)}
              />
            </div>
            {/* <input className="add-specifications-button" type="button" value="+"></input> */}
          </div>
        </div>
        <input
          type="submit"
          value="Add Product"
          className="add-product-submit-button"
        />
      </div>
    </form>
  );
};

export default AddProduct;
