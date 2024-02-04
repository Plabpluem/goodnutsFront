import classes from "./imagedetailproduct.module.css";
import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageDetailProduct = (props) => {
  const [indexPic, setIndexpic] = useState(0);
  const [isAnimating, setAnimate] = useState(false);

  const slideImageLeft = () => {
    setAnimate(true);
    setIndexpic((prev) => (prev === 0 ? props.slides.length - 1 : prev - 1));
  };

  const slideImageRight = () => {
    setAnimate(true);
    setIndexpic((prev) => (prev === props.slides.length - 1 ? 0 : prev + 1));
  };

  const onChangeImage = (index) => {
    setIndexpic(index);
  };

  return (
    <div className={classes.imagedetailContainer}>
      <div className={classes.imageSlide}>
        <div className={classes.buttonLR}>
          <button onClick={slideImageLeft}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: "#4b4b4b" }}
              size="xl"
            />
          </button>
          <button onClick={slideImageRight}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#4b4b4b" }}
              size="xl"
            />
          </button>
        </div>
        {props.slides.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                index === indexPic
                  ? `${classes.slide} ${classes.active}`
                  : classes.slide
              }`}
            >
              {index === indexPic && (
                <LazyLoadImage
                  src={`http://13.250.122.193:8080/${item}`}
                  alt=""
                  className={`${isAnimating ? classes.animating : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className={classes.selectImageContainer}>
        {props.slides.map((item, index) => {
          return (
            <img
              src={`http://13.250.122.193:8080/${item}`}
              key={index}
              alt=""
              className={
                index === indexPic
                  ? `${classes.selectImage} ${classes.active}`
                  : classes.selectImage
              }
              onClick={() => onChangeImage(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageDetailProduct;
