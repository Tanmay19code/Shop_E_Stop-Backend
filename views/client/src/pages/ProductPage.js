import React, { useState, useEffect } from "react";
import laptop from "../images/laptop1.jpg";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/productActions.js";
import { addToCart } from "../redux/actions/orderActions.js";
import store from "../redux/store.js";
import throttle from "lodash.throttle";

const ProductPage = (props) => {
  let state;
  const [image, setImage] = useState("");
  // const state = store.getState();
  const dispatch = useDispatch(null);
  const navigate = useNavigate();
  // const product = state.product.fetchedProduct
  const [product, setProduct] = useState({});
  // const [user, setUser] = useState(undefined);
  // let user = undefined;
  state = JSON.parse(localStorage.getItem("state"));

  // setUser(state.auth.userDetail);
  let user = state.auth.userDetail || undefined;

  useEffect(() => {
    dispatch(getProduct(props.productId))
      .then(() => {
        // throttle(() => {
        //   setProduct(state.product.fetchedProduct);
        // }, 1000);

        // Rather than storing in local state, dispatch another actiona dnstore it in global state

        setProduct(state.product.fetchedProduct);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log("Product fetched=>", product);
  useEffect(() => {
    try {
      if (product && product.image) {
        import(`../backendimages/${product.image}`).then((img) => {
          setImage(img.default);
          // console.log("IMAGE=>", image);
        });
      }
    } catch (err) {
      setImage("");
    }
  }, [product]);

  const addItemToCart = () => {
    if (user && user.name) {
      dispatch(addToCart(props.productId))
        .then(() => {
          navigate("/cart");
          setTimeout(() => {
            window.location.reload(false);
          }, 3);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert("Please Login to continue");
    }
  };

  return (
    <>
      {product && (
        <div className="page-container product-container">
          <div className="product-container-left">
            <div className="product-header">
              <div className="product-image-div">
                <img src={image} alt="speaker" />
                <p className="product-image-price mobile-display">
                  {`₹` + product.price}
                </p>
              </div>
              <div className="product-info">
                <div className="product-title">
                  <p id="product-info-heading">{product.name}</p>
                  {product.ranking && (
                    <div className="rating">
                      <AiFillStar />
                      <p>{product.ranking}</p>
                    </div>
                  )}
                  {/* <div className="rating">
                <AiFillStar />
                <p></p>
              </div> */}
                </div>
                <div className="product-title-description mobile-display">
                  <ul>
                    {/* <li>Core i3 10th Gen</li>
                <li>8 GB/1 TB HDD</li>
                <li>Windows 10 Home</li>
                <li>15.6 inch, Black, With MS Office</li> */}
                    <li>{product.description}</li>
                  </ul>
                </div>
                <p className="product-image-price laptop-display">
                  {`₹` + product.price}
                </p>
                <div className="product-title-buttons">
                  <button id="add-to-cart-button" onClick={addItemToCart}>
                    Add to Cart
                  </button>
                  {/* <button id="buy-button">Buy Now</button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="product-container-right">
            <div className="product-title-description laptop-display">
              <ul>
                {/* <li>Core i3 10th Gen</li>
            <li>8 GB/1 TB HDD</li>
            <li>Windows 10 Home</li>
            <li>15.6 inch, Black, With MS Office</li> */}
                <li>{product.description}</li>
              </ul>
            </div>
            {/* <div className="product-expected-delivery">
              <hr />
              <p id="product-details-header">Expected Delivery :</p>
              <p id="product-details-delivery">
                {props.productId}
                Delivery expected by <strong>Tue, 10th Aug</strong>
              </p>
              <p id="product-details-delivery">Delivery Charges: ₹100</p>
            </div> */}
            <div className="product-details-description">
              <hr />
              <p id="product-details-header">Highlights :</p>
              {product.highlights && (
                <ul>
                  {/* <li>Pre-installed Genuine Windows 10 OS</li>
            <li>Preloaded with MS Office</li>
            <li>Light Laptop without Optical Disk Drive</li>
            <li>15.6 inch</li> */}
                  {product?.highlights
                    .filter((item) => {
                      if (item.length > 0) {
                        return item;
                      }
                    })
                    .map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              )}
            </div>
            <div className="product-details-specifications">
              <hr />
              <p id="product-details-header">Specifications :</p>
              <ul id="product-specification-ul">
                <li>
                  {product.specifications && (
                    <ul id="specification-individual">
                      {product?.specifications.map((item, index) => {
                        return (
                          <li key={index}>
                            <p className="specification-individual-left">
                              {item.key}
                            </p>
                            <p className="specification-individual-right">
                              {item.value}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
