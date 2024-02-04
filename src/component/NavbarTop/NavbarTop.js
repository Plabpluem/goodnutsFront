import { Link } from "react-router-dom";
import classes from "./navbartop.module.css";
import { useDispatch } from "react-redux";
import { statusAction } from "../../Store/redux";

const NavbarTop = (props) => {
  const dispatch = useDispatch();

  const onSubmitHandler = (e, title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
  };
  return (
    <div className={classes.navbartop}>
      <ul>
        <li>
          <Link to="/product">
            <span
              onClick={(e) => {
                onSubmitHandler(e, "สินค้าทั้งหมด", [
                  "Mixednuts",
                  "CaramelMixnut",
                  "CaramelCoffee",
                  "Pistachio",
                  "Walnuts",
                  'Macadamia',
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
              ALL
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/product"
            onClick={(e) => {
              onSubmitHandler(e, "Mixed Nuts", [
                "Mixednuts",
                "CaramelMixnut",
                "CaramelCoffee",
              ]);
            }}
          >
            Mixed Nuts
          </Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Macadamia',[ 'Macadamia','CaramelMacadamia'])}}>Macadamia</Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Pistachios',[ "Pistachio"])}}>Pistachios</Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Walnuts',[ "Walnuts",])}}>Walnuts</Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Peacans',[ "Peacan",])}}>Peacans</Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Sweet treats & Cookies',[ 'CaramelMixnut','CaramelMacadamia',"CaramelCoffee","Cookiesingapore","Cerealcookies",])}}>Sweet treats</Link>
        </li>
        <li>
          <Link to="/product" onClick={(e)=>{onSubmitHandler(e,'Dried Fruits',[ "Apricotdried","Cranberrydried",])}}>Dried Fruits</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarTop;
