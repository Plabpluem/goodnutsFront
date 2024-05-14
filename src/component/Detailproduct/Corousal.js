import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./corousal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Corousal = ({ children }) => {
  const [currentPic, setCurrentPic] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef();

  const onChangeImage = (index) => {
    containerRef.current.style.transitionDuration = "400ms";
    setCurrentPic((prev) => {
      const newIPic = index;
      if (index < currentPic) {
        setTranslateX(containerRef.current.clientWidth * newIPic);
      } else {
        setTranslateX(containerRef.current.clientWidth * newIPic);
      }
      return newIPic;
    });
  };

  const actionHandler = (mode) => {
    containerRef.current.style.transitionDuration = "400ms";
    if (mode === "prev") {
      if (currentPic <= 1) {
        setTranslateX(0);
        setCurrentPic(children.length);
      } else {
        setTranslateX(containerRef.current.clientWidth * (currentPic - 1));
        setCurrentPic((prev) => --prev);
      }
    } else if (mode === "next") {
      if (children.length === 1) {
        return
      } else if (currentPic >= children.length) {
        setTranslateX(containerRef.current.clientWidth * (children.length + 1));
        setCurrentPic(1);
      } else {
        setTranslateX(containerRef.current.clientWidth * (currentPic + 1));
        setCurrentPic((prev) => ++prev);
      }
    }
  };

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = children.map((child, index) => {
        return (
          <li key={index} className={classes.slidePic}>
            {child}
          </li>
        );
      });
      return [
        <li className={classes.slidePic}>{children[children.length - 1]}</li>,
        ...items,
        <li className={classes.slidePic}>{children[0]}</li>,
      ];
    }
    return <li className={classes.slidePic}>{children[0]}</li>;
  }, [children]);

  const selectSlide = useMemo(() => {
    let selectBox = Children.map(children, (child, index) => {
      return (
        <li
          key={index}
          className={
            index === currentPic - 1
              ? `${classes.selectImage} ${classes.active}`
              : classes.selectImage
          }
          onClick={() => onChangeImage(index + 1)}
        >
          {child}
        </li>
      );
    });
    return [...selectBox];
  }, [currentPic, children]);

  useLayoutEffect(() => {
    if (children.length === 1) {
      setTranslateX(containerRef.current.clientWidth * 0);
    } else {
      setTranslateX(containerRef.current.clientWidth * currentPic);
    }
  }, []);

  useEffect(() => {
    const transitionEnd = () => {
      if (currentPic <= 1) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * currentPic);
      }
      if (currentPic >= children.length) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * children.length);
      }
    };
    document.addEventListener("transitionend", transitionEnd);
    return () => {
      document.removeEventListener("transitionend", transitionEnd);
    };
  }, [currentPic, children]);

  useEffect(() => {
    const handleResize = () => {
      setTranslateX(containerRef.current.clientWidth * currentPic);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPic]);

  return (
    <div className={classes.Root}>
      <section>
        <ul
          className={classes.slideContainer}
          style={{ transform: `translate3d(${-translateX}px,0,0)` }}
          ref={containerRef}
        >
          {slides}
        </ul>
        <button
          className={`${classes.Btn} ${classes.BtnLeft}`}
          onClick={() => actionHandler("prev")}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#4b4b4b" }}
            size="xl"
          />
        </button>
        <button
          className={`${classes.Btn} ${classes.BtnRight}`}
          onClick={() => actionHandler("next")}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ color: "#4b4b4b" }}
            size="xl"
          />
        </button>
      </section>
      <div className={classes.selectImageContainer}>
        <ul className={classes.selectImageContainer}>{selectSlide}</ul>
        {/* {props.slides.map((item, index) => {
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
        })} */}
      </div>
    </div>
  );
};

export default Corousal;
