import classes from "./promotion.module.css";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { statusAction } from "../../Store/redux";
import Corousal from "../Detailproduct/Corousal";
import CorousalAuto from "../../Ul/CorousalAuto/CorousalAuto";

const Promotion = () => {
  const dispatch = useDispatch();
  const promotion = [
    {
      id: "4",
      pic: "https://img5.pic.in.th/file/secure-sv1/promotion8.jpeg",
      url: "/product/CaramelMixnut",
    },
    {
      id: "1",
      pic: "https://img2.pic.in.th/pic/promotion3.jpeg",
      url: "/product/Mixednuts",
    },
    {
      id: "2",
      pic: "https://img2.pic.in.th/pic/promotion2.jpeg",
      url: "/product",
    },
    {
      id: "3",
      pic: "https://img5.pic.in.th/file/secure-sv1/Promotion5.jpeg",
      url: "/product/Pistachio",
    },
  ];

  const onSendData = (item, title, filter) => {
    if (item === "2") {
      dispatch(statusAction.changeFilter({ filter: filter, title: title }));
    }
    return;
  };

  const onSendSelect = (title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
  };

  return (
    <div className={classes.promotion}>
      <div className={classes.a}>
        <CorousalAuto dataNavbar={onSendData}>{promotion}</CorousalAuto>
      </div>
      <div className={classes.b}>
        <img
          src="https://img5.pic.in.th/file/secure-sv1/promotion1.jpeg"
          alt=""
        />
      </div>
      <div className={classes.c}>
        <Link
          to="/product"
          onClick={() => {
            onSendSelect("Dried Fruits", ["Apricotdried", "Cranberrydried"]);
          }}
        >
          <img src="https://img2.pic.in.th/pic/promotion6.jpeg" alt="" />
        </Link>
      </div>
      <div className={classes.d}>
        <img src="https://img2.pic.in.th/pic/promotion7.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Promotion;
