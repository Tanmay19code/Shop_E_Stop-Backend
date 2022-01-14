import React from "react";
import img from "../images/laptop1.jpg";
import { AiFillStar } from "react-icons/ai";

const SearchItem = () => {
  return (
    <div className="search-item-container">
      <div className="search-item-container-left">
        <img src={img} alt="" />
      </div>
      <div className="search-item-container-right">
        <div className="search-item-header-holder">
          <p className="search-item-header">Dell Inspiron 352</p>
          <div className="search-item-rating">
            <p>4.2</p>
            <AiFillStar />
          </div>
        </div>
        <div className="search-item-price">
          <p>₹65,000</p>
        </div>
        <div className="search-item-description">
          <p>
            Core i3 10th Gen 8 GB/1 TB HDD Windows 10 Home 15.6 inch, Black,
            With MS Office
          </p>
        </div>
        <div className="search-item-highlights">
          <ul>
            <li>Pre-installed Genuine Windows 10 OS</li>
            <li>Preloaded with MS Office</li>
            <li>Light Laptop without Optical Disk Drive</li>
            <li>15.6 inch</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
