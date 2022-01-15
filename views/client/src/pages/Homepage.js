import React, { useState, useEffect } from "react";
import CarouselDiv from "../components/CarouselDiv";
import CardContainer from "../components/CardContainer";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions.js";
import image from "../images/speaker.jpg";

const Homepage = () => {
  const [products, setProducts] = useState({
    products: [{}],
    productCount: 0,
  });

  let state, imagePath;

  const dispatch = useDispatch(null);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        // state = JSON.parse(localStorage.getItem("state"));
        // setProducts({
        //   ...products,
        //   products: state.product.products.products,
        //   productCount: state.product.products.productCount,
        // });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="page-container">
      <CarouselDiv className="carousel-holder" />
      {/* <CardContainer title="Recommendations based on your search  " /> */}
      <CardContainer title="Laptops and Desktops" category="laptop" />
      <CardContainer title="Mobiles and Tablets" category="mobile" />
      <CardContainer title="Digital Smart Watches" category="watch" />
      <CardContainer title="Speakers and Microphones" category="speaker" />
      {/* <CardContainer title="Smart T.V." category="tv" />
      <CardContainer title="Camera" category="camera" /> */}
      {/* <div>
        {console.log(products)}
        <img src={products.products[0].image} alt="" />
        {products.products.map((product, index) => {
          return (
            <div key={index}>
              <h1>{product.name}</h1>
              <h2>{`../../../backend/images/${product.image.slice(
                29,
                product.image.length
              )}`}</h2>
              <img src={product.image} alt="image" />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Homepage;
