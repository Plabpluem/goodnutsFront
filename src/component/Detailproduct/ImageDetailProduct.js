import classes from "./imagedetailproduct.module.css";
import { useMemo, useState } from "react";
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

  const slides = useMemo(() => {
    if (props.slides.length > 1) {
      let pic = props.slides.map((slide, index) => {
        <li key={index} className={classes.Slide}>
          {slide}
        </li>;
      });
      return [
        <li key={props.slides.length + 1} className={classes.Slide}>
          {props.slides[props.slides.length - 1]}{" "}
        </li>,
        ...pic,
        <li key={props.slides.length + 2} className={classes.Slide}>
          {props.slides[0]}
        </li>,
      ];
    }
  });
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
        <ul>{slides}</ul>
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
                  src={`${process.env.REACT_APP_GOODNUT_API}/${item}`}
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
              src={`${process.env.REACT_APP_GOODNUT_API}/${item}`}
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
