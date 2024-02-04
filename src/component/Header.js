import classes from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/GoodnutsLogo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cartlist from "../Ul/Cartlist";
import { Link } from "react-router-dom";
import NavbarPage from "../Ul/NavbarPage";
import UserSlide from "../Ul/UserSlide/UserSlide";
import { useDispatch, useSelector } from "react-redux";
import { statusAction } from "../Store/redux";

const Header = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartRef = useRef();
  const userRef = useRef();

  const user = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const toggleCartHandler = (e) => {
    e.stopPropagation();
    setShowCart((prev) => !prev);
    setShowUser(false);
  };

  const toggleUserHandler = (e) => {
    e.stopPropagation();
    setShowUser((prev) => !prev);
    setShowCart(false);
  };

  const toggleNavbarHandler = () => {
    setShowNavbar((prev) => !prev);
  };

  const handleOutsideClick = useCallback((e) => {
    const isProductItem = e.target.classList.contains("productItem");

    if (
      cartRef.current &&
      !cartRef.current.contains(e.target) &&
      !isProductItem
    ) {
      setShowCart(false);
    }
  }, []);

  const handleOutsideClickUser = useCallback((e) => {
    if (userRef.current && !userRef.current.contains(e.target)) {
      setShowUser(false);
    }
  }, []);

  const onGotoPageHandler = (e, title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
  };

  useEffect(() => {
    if (showUser) {
      document.addEventListener("click", handleOutsideClickUser);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClickUser);
    };
  }, [showUser,handleOutsideClick,handleOutsideClickUser]);

  return (
    <header className={classes.header}>
      <div className={classes.topic}>
        <img src={logo} alt="" className={classes.logo} />
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "#504243" }}
          className={classes.shownavbar}
          onClick={toggleNavbarHandler}
        />
        <div className={classes.select}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link
            to="/product"
            className={classes.link}
            onClick={(e) => {
              onGotoPageHandler(e, "สินค้าทั้งหมด", [
                "Mixednuts",
                "Caram elMixnut",
                "CaramelCoffee",
                "Pistachio",
                "Walnuts",
                "Peacan",
                "Macadamia",
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
            Product
          </Link>
          <div className={classes.userLogin}>
            {!user && (
              <Link to="/login" onClick={() => setShowCart(false)}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#50424c" }} />
              </Link>
            )}
            {user && (
              <p onClick={toggleUserHandler} className={classes.usernameLogin}>
                {email.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
          <div className={classes.cart}>
            <div onClick={toggleCartHandler}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={
                  showCart
                    ? { color: "rgba(255, 77, 0, 1)" }
                    : { color: "#50424c" }
                }
              />
              <span className={showCart ? classes.active : null}>
                {cart.totalItem}
              </span>
            </div>
          </div>
          <NavbarPage show={showNavbar} closeNavbar={toggleNavbarHandler} />
        </div>
        <Cartlist
          show={showCart}
          closeCart={() => setShowCart(false)}
          totalItem={props.totalItem}
          ref={cartRef}
        />
        <UserSlide
          show={showUser}
          closeUser={() => setShowUser(false)}
          ref={userRef}
        />
      </div>
    </header>
  );
};

export default Header;
