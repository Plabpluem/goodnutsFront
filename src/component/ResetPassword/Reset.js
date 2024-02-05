import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./reset.module.css";

const Reset = () => {
  const email = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(false)

  const onSubmitEmailHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/auth/resetmain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
        }),
      });
      const res = await response.json();
      if (response.status === 401) {
        setError(res.message);
        return;
      }
      localStorage.setItem("userId", JSON.stringify(res.userId));
      navigate(`/reset/${res.token}`);
    } catch (err) {
      console.log(err)
    } finally{
      setLoading(false)
    }
  };
  return (
    <div className={loading ? `${classes.resetContainer} ${classes.spinner}`: classes.resetContainer}>
      <h1>เปลี่ยนรหัสผ่าน</h1>
      <form onSubmit={onSubmitEmailHandler}>
        <div className={classes.InfoInput}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" ref={email} />
          {error && <p className={classes.error}>{error}</p>}
        </div>
        <div className={classes.btnDual}>
          <button type="submit">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
