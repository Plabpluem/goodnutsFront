import { Link } from "react-router-dom";
import classes from "./navbarpage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { statusAction } from "../Store/redux";

const NavbarPage = (props) => {
   const dispatch = useDispatch();

  const onSubmitHandler = (e, title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
    props.closeNavbar()
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
              <Link to="/product" onClick={(e) => {
              onSubmitHandler(e, "Mixed Nuts", [
                "Mixednuts",
                "CaramelMixnut",
                "CaramelCoffee",
              ]);
            }}>Mixed Nuts</Link>
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
      )}
    </>
  );
};

export default NavbarPage;
