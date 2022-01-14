import React, { useState } from "react";
// import speaker from "../images/speaker.jpg";
import speaker from "../backendimages/IMG1642150950509_all_pets.png";

function Card(props) {
  const [image, setImage] = useState("");

  // const loadImage = (imageName) => {
  try {
    import(`../backendimages/${props.image_main}`).then((img) => {
      setImage(img.default);
      // console.log("IMAGE=>", image);
    });
  } catch {
    setImage("");
  }
  // };

  console.log("IMAGE=>", props.image_main);
  // let image = "http://localhost:5000/images/IMG1642143481954_all_pets.png";
  // console.log("IMAGE SLICE=>", image.slice(29, image.length));

  return (
    <div>
      <div className="card-body">
        <div className="card-image">
          {/* <img src="" alt="speaker" /> */}
          <img src={image} alt="speaker" />
        </div>
        <div className="card-details">
          {/* <p id="product-name">SONY D4 speaker</p>
                    <p id="product-price">9,000 ₹</p> */}
          <p id="product-name">{props.name}</p>
          <p id="product-price">{props.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
