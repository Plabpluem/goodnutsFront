import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./corousal.module.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

const CorousalAuto = ({ children, dataNavbar }) => {
  const [currentPic, setCurrentPic] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef();

  const prevClickHandler = () => {
    containerRef.current.style.transitionDuration = "400ms";
    if (currentPic <= 1) {
      setTranslateX(0);
      setCurrentPic(children.length);
    } else {
      setTranslateX(containerRef.current.clientWidth * (currentPic - 1));
      setCurrentPic((prev) => --prev);
    }
  };

  const nextClickHandler = useCallback(() => {
    containerRef.current.style.transitionDuration = "400ms";
    if (currentPic >= children.length) {
      setCurrentPic(1);
      setTranslateX(containerRef.current.clientWidth * (children.length + 1));
    } else {
      setCurrentPic((prev) => {
        const current = prev + 1;
        setTranslateX(containerRef.current.clientWidth * current);
        return current;
      });
    }
  }, [currentPic, children]);

  const slides = useMemo(() => {
    const allTypeProduct = [
      "Mixednuts",
      "CaramelMixnut",
      "CaramelCoffee",
      "Pistachio",
      "Walnuts",
      "Peacan",
      "CaramelMixnut",
      "CaramelMacadamia",
      "CaramelCoffee",
      "Cookiesingapore",
      "Cerealcookies",
      "Apricotdried",
      "Cranberrydried",
    ];
    const pics = children.map((child, index) => {
      return (
        <li
          className={classes.slidePic}
          onClick={(e)=>dataNavbar(child.id,"สินค้าทั้งหมด",allTypeProduct)}
        >
          <Link to={child.url}>
            <img key={index} alt="pic" src={child.pic} />
          </Link>
        </li>
      );
    });
    return [
      <li className={classes.slidePic}>
        <Link to={children[children.length - 1].url}>
          <img src={children[children.length - 1].pic} alt="pic" />
        </Link>
      </li>,
      ...pics,
      <li className={classes.slidePic}>
        <Link to={children[0].url}>
          <img src={children[0].pic} alt="pic" />
        </Link>
      </li>,
    ];
  }, [children]);

  useEffect(() => {
    // current เปลี่ยนจาก button + slide =>
    const transition = () => {
      if (currentPic <= 1) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * currentPic);
      } else if (currentPic >= children.length) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * children.length);
      }
    };
    document.addEventListener("transitionend", transition);
    return () => {
      document.removeEventListener("transitionend", transition);
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

  useEffect(() => {
    let interval = setInterval(() => {
      nextClickHandler();
    }, 5000);

    const mouseEnterHandler = () => {
      if (containerRef.current) {
        clearInterval(interval);
      }
    };

    const mouseLeaveHandler = () => {
      if (containerRef.current) {
        interval = setInterval(() => {
          nextClickHandler();
        }, 5000);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mouseenter", mouseEnterHandler);
      containerRef.current.addEventListener("mouseleave", mouseLeaveHandler);
    }

    return () => {
      clearInterval(interval);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mouseenter",
          mouseEnterHandler
        );
        containerRef.current.removeEventListener(
          "mouseleave",
          mouseLeaveHandler
        );
      }
    };
  }, [nextClickHandler]);

  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * currentPic);
  }, []);

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
          onClick={prevClickHandler}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#4b4b4b" }}
            size="xl"
          />
        </button>
        <button
          className={`${classes.Btn} ${classes.BtnRight}`}
          onClick={nextClickHandler}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ color: "#4b4b4b" }}
            size="xl"
          />
        </button>
      </section>
    </div>
  );
};

export default CorousalAuto;
