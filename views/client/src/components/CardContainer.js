import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import laptop from "../sampleData/laptop.js";

function CardContainer(props) {
  let state;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(6);
  const handleViewMore = () => {
    setEndIndex(endIndex + 6);
  };
  const [products, setProducts] = useState({
    products: [{}],
    productCount: 0,
  });
  useEffect(() => {
    state = JSON.parse(localStorage.getItem("state"));
    setProducts({
      ...products,
      products: state.product.products.products,
      productCount: state.product.products.productCount,
    });
  }, []);

  return (
    <div>
      <div className="card-container-holder">
        <div className="card-container-title">{props.title}</div>
        <hr />
        <div className="card-container-cards">
          {console.log(products.products)}
          {products.products
            .filter((item) => {
              if (item.category == `${props.category}`) {
                return item;
              }
            })
            .slice(startIndex, endIndex)
            .map((item) => {
              return (
                <>
                  <Link
                    to={`/product/${item._id}`}
                    onClick={() => {
                      localStorage.setItem("selectedProduct", item._id);
                    }}
                    target="_blank"
                    key={item._id}
                  >
                    <Card
                      name={item.name}
                      price={item.price}
                      image_main={item.image}
                      key={item._id}
                    />
                  </Link>
                </>
              );
            })}
        </div>
        <p id="view-more" onClick={handleViewMore}>
          View More
        </p>
      </div>
    </div>
  );
}

CardContainer.defaultProps = {
  title: "Recommendations",
};
export default CardContainer;
