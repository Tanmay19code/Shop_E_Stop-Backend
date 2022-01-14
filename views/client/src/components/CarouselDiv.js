import React from "react";
import car_img1 from "../images/car1.jpg";
import car_img2 from "../images/car2.jpg";
import car_img3 from "../images/car3.jpg";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

function CarouselDiv() {
  const carouselRef = React.useRef(null);

  let resetTimeout;
  return (
    <div className="carousel-holder">
      <Carousel
        ref={carouselRef}
        enableAutoPlay={true}
        enableSwipe={true}
        enableMouseSwipe={true}
        preventDefaultTouchmoveEvent={true}
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === 3) {
            resetTimeout = setTimeout(() => {
              carouselRef.current.goTo(0);
            }, 2000);
          }
        }}
      >
        <div className="carousel-div">
          <img src={car_img1} alt="carousel image" className="carousel-image" />
        </div>
        <div className="carousel-div">
          <img src={car_img2} alt="carousel image" className="carousel-image" />
        </div>
        <div className="carousel-div">
          <img src={car_img3} alt="carousel image" className="carousel-image" />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselDiv;
