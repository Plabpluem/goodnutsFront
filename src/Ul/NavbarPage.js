import { Link } from "react-router-dom";
import classes from "./navbarpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const NavbarPage = (props) => {
   const dispatch = useDispatch();

  const onSubmitHandler = (e, title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
    props.closeNavbar
  };
  return (
    <>
      {props.show && (
        <div
          className={classes.navbarpageContainer}
        >
            <FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} onClick={props.closeNavbar} className={classes.close}/>
          <ul>
            <li>
              <Link to="/product" onClick={(e) => {
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
              }}>ALL</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Mixed Nuts</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Macadamia</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Pistachios</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Walnuts</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Peacans</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Sweet treats</Link>
            </li>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>Dried Fruits</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarPage;
