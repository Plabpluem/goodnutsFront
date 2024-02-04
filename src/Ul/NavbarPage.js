import { Link } from "react-router-dom";
import classes from "./navbarpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark } from "@fortawesome/free-solid-svg-icons";

const NavbarPage = (props) => {
  return (
    <>
      {props.show && (
        <div
          className={classes.navbarpageContainer}
        >
            <FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} onClick={props.closeNavbar} className={classes.close}/>
          <ul>
            <li>
              <Link to="/product" onClick={props.closeNavbar}>ALL</Link>
            </li>
            <li>
              <Link to="/product/productMixednuts" onClick={props.closeNavbar}>Mixed Nuts</Link>
            </li>
            <li>
              <Link to="/product/productMacadamia" onClick={props.closeNavbar}>Macadamia</Link>
            </li>
            <li>
              <Link to="/product/productPistachios" onClick={props.closeNavbar}>Pistachios</Link>
            </li>
            <li>
              <Link to="/product/productWalnuts" onClick={props.closeNavbar}>Walnuts</Link>
            </li>
            <li>
              <Link to="/product/productPeacans" onClick={props.closeNavbar}>Peacans</Link>
            </li>
            <li>
              <Link to="/product/productSweetandcookie" onClick={props.closeNavbar}>Sweet treats</Link>
            </li>
            <li>
              <Link to="/product/productDriedFruits" onClick={props.closeNavbar}>Dried Fruits</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarPage;
