import React from "react";
import { CSSTransition } from "react-transition-group";
import { useUserAuth } from "../../Context/Authredux";
import classes from "./userslide.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { getAuthToken, getProductId } from "../../Util/Auth";

const UserSlide = React.forwardRef((props, ref) => {
  const user = getAuthToken();
  const email = localStorage.getItem("email");
  const productId = getProductId();
  const navigate = useNavigate();

  const logoutUser = () => {
    props.closeUser();
  };

  return (
    <CSSTransition
      in={props.show}
      timeout={{ enter: 500, exit: 500 }}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: "",
        exit: "",
        enterActive: classes.ModalOpen,
        exitActive: classes.ModalExit,
      }}
    >
      <div className={classes.userContainer} ref={ref}>
        {user && <p>Hi, {email.split("@")[0]}</p>}
        <div className={classes.userDoing}>
          {email === "plurm@windowslive.com" && (
            <>
              <Link to="/addproduct" onClick={logoutUser}>
                เพิ่ม product
              </Link>
              <Link to='/orderuser' onClick={logoutUser}>
                รายการสั่งซื้อลูกค้า
              </Link>
            </>
          )}
          <Link to={`/profile/${productId}`} onClick={logoutUser}>
            ข้อมูลส่วนตัว{" "}
          </Link>
        </div>
        <Form method="post" action="/logout" onClick={logoutUser}>
          <button>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "var(--orange)" }}
            />
            Logout
          </button>
        </Form>
      </div>
    </CSSTransition>
  );
});

export default UserSlide;
