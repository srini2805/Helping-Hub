import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <>
      <Carousel fade interval={3000} className="mb-4">
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="/images/car1.png"
            alt="First"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="/images/car2.png"
            alt="Second"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block carousel-img"
            src="/images/car3.png"
            alt="Third"
          />
          
        </Carousel.Item>
      </Carousel>

      {/* Inline CSS */}
      <style jsx="true">{`
        .carousel-img {
          width: 110%;
          height: 350px;
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default CarouselComponent;
