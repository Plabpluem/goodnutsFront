import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./reset.module.css";

const Resetpassword = () => {
  const { tokenId } = useParams();
  const newpassword = useRef();
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)

  const onSubmitResetHandler = async (e) => {
    e.preventDefault();
    const parser = JSON.parse(localStorage.getItem("userId"));
    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/auth/newPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newpassword.current.value,
          token: tokenId,
          userId: parser,
        }),
      });
      await response.json();
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className={loading ? `${classes.resetContainer} ${classes.spinner}`: classes.resetContainer}>
      <h1>ป้อนรหัสผ่านใหม่</h1>
      <form onSubmit={onSubmitResetHandler}>
        <div className={classes.InfoInput}>
          <label htmlFor="password">New-password</label>
          <input type="password" name="password" ref={newpassword} />
        </div>
        <div className={classes.btnDual}>
          <button type="submit">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Resetpassword;
