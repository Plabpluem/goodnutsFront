import classes from "./promotion.module.css";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { statusAction } from "../../Store/redux";

const Promotion = () => {
  const dispatch = useDispatch();
  const promotion = [
    {
      id:'4',
      pic:'https://img5.pic.in.th/file/secure-sv1/promotion8.jpeg',
      url:'/product/CaramelMixnut'
    },
    {
      id: "1",
      pic: 'https://img2.pic.in.th/pic/promotion3.jpeg',
      url: "/product/Mixednuts",
    },
    {
      id: "2",
      pic: 'https://img2.pic.in.th/pic/promotion2.jpeg',
      url: "/product",
    },
    {
      id: "3",
      pic: 'https://img5.pic.in.th/file/secure-sv1/Promotion5.jpeg',
      url: "/product/Pistachio",
    },
  ];

  const onSendData = (item, title, filter) => {
    if (item === '2') {
      dispatch(statusAction.changeFilter({ filter: filter, title: title }));
    }
    return
  };

  const onSendSelect = (title,filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
  }

  return (
    <div className={classes.promotion}>
      <div className={classes.a}>
        <Slide duration={5000}>
          {promotion.map((item) => {
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  onSendData(item.id, "สินค้าทั้งหมด", [
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
                  ]);
                }}
              >
                <Link to={item.url}>
                  <img src={item.pic} alt="" />
                </Link>
              </div>
            );
          })}
        </Slide>
      </div>
      <div className={classes.b}>
        <img src='https://img5.pic.in.th/file/secure-sv1/promotion1.jpeg' alt="" />
      </div>
      <div className={classes.c}>
        <Link to="/product" onClick={() => {
                  onSendSelect("Dried Fruits", [
                    "Apricotdried",
                    "Cranberrydried",
                  ]);
                }}>
          <img src='https://img2.pic.in.th/pic/promotion6.jpeg' alt="" />
        </Link>
      </div>
      <div className={classes.d}>
        <img src='https://img2.pic.in.th/pic/promotion7.jpeg' alt="" />
      </div>
    </div>
  );
};

export default Promotion;
