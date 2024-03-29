import classes from "./sideheader.module.css";
import "./style.css";
import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const SlideHeader = () => {
  const PicTItle = [
    "https://img2.pic.in.th/pic/About534d8572d330f719.jpeg",
    "https://img5.pic.in.th/file/secure-sv1/About2.jpeg",
  ];
  const [indexPic, setIndexPic] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndexPic((prev) => (prev === PicTItle.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearTimeout(timer);
  }, [indexPic, PicTItle.length]);

  return (
    <div className={classes.slider}>
      <TransitionGroup>
        <CSSTransition key={indexPic} classNames="fade" timeout={1000}>
          <img src={PicTItle[indexPic]} alt="" />
        </CSSTransition>
      </TransitionGroup>
      <div className={classes.logoBrand}>
        <h1>Goodnuts</h1>
        <p>ถั่วอบทรัฟเฟิล คิดสูตรเอง ขายเอง เจ้าแรก</p>
      </div>
    </div>
  );
};

export default SlideHeader;
