import { useRef, useState } from "react";
import classes from "./register.module.css";
import { Form, useNavigate, useSearchParams } from "react-router-dom";

const Registor = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValidPassword, setValidConfirmPassword] = useState(false);
  const [loading, isLoading] = useState(false);
  const inputEmail = useRef("");
  const inputPassword = useRef("");
  const inputConfirmPassword = useRef("");
  const [searchParams] = useSearchParams();
  // รับค่าContext
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLogin = searchParams.get("name") === "register";

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const email = inputEmail.current.value !== "";
    !email ? setEmailValid(true) : setEmailValid(false);

    const password =
      inputPassword.current.value.length > 7 &&
      inputPassword.current.value !== "";
    !password ? setPasswordValid(true) : setPasswordValid(false);

    const passwordEqual =
      inputPassword.current.value === inputConfirmPassword.current.value;
    if (password) {
      !passwordEqual
        ? setValidConfirmPassword(true)
        : setValidConfirmPassword(false);
    }

    if (email && password && passwordEqual) {
      setError("");
      isLoading(true)
      try {
        const response = await fetch(
          "http://13.250.122.193:8080/auth/signup",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: inputEmail.current.value,
              password: inputPassword.current.value,
              confirmPassword: inputConfirmPassword.current.value,
            }),
          }
        );
        const resData = await response.json();
        if (response.status === 422) {
          setError(resData.data[0].msg);
          return;
        }
        inputEmail.current.value = "";
        inputPassword.current.value = "";
        inputConfirmPassword.current.value = "";
        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally{
        isLoading(false)
      }
    }
  };
  return (
    <div
      className={
        loading
          ? `${classes.registorContainer} ${classes.spinner}`
          : classes.registorContainer
      }
    >
      <h3>{isLogin ? "ลงทะเบียน" : "รีเซ็ตรหัสผ่าน"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={onSubmitHandler}>
        <div className={classes.InfoInput}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ป้อนอีเมลของคุณ"
            ref={inputEmail}
          />
          {emailValid && <p>ป้อนอีเมลให้ถูกต้อง</p>}
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="password">
            {isLogin ? "Password" : "Old password"}
          </label>
          <input
            type="password"
            placeholder="ป้อนรหัสผ่าน"
            name="password"
            ref={inputPassword}
          />
          {passwordValid && <p>ป้อนรหัสมากกว่าหรือเท่ากับ 8 ตัว</p>}
          {confirmValidPassword && <p>ป้อนรหัสให้ตรงกัน</p>}
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="confirmPassword">
            {isLogin ? "Confirm password" : "New password"}
          </label>
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            ref={inputConfirmPassword}
          />
          {confirmValidPassword && <p>ป้อนรหัสให้ตรงกัน</p>}
        </div>
        <button type="submit">{isLogin ? "สมัครสมาชิก" : "ยืนยัน"}</button>
      </Form>
    </div>
  );
};

export default Registor;
