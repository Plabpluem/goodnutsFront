import { useRef, useState } from "react";
import classes from "./login.module.css";
import { Form, Link,useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/Authredux";

const Login = ({errors}) => {
  const inputEmail = useRef()
  const inputPassword = useRef()

  return (
    <div className={classes.registorContainer}>
      <h3>เข้าสู่ระบบ</h3>
      {errors?.validation && <p style={{color:'red'}}>{errors.validation}</p>}
      <Form method="post">
        <div className={classes.InfoInput}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="ป้อนอีเมลของคุณ" ref={inputEmail}/>
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="email">Password</label>
          <input type="password" name="password" placeholder="ป้อนรหัสผ่าน" ref={inputPassword}/>
        </div>
        <div className={classes.btnDual}>
          <button type="submit">เข้าสู่ระบบ</button>
        </div>
      </Form>
      <p>ยังไม่มีบัญชีใช่ไหม ? <Link to={'/register?name=register'}>Register here</Link></p>
      <p>ลืมรหัสผ่าน <Link to={'/reset'}><span>Click here</span></Link></p>
      
    </div>
  );
};

export default Login;