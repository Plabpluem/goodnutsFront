import React from "react";
import Login from "../component/RegisterAndLogin/Login";
import {redirect, useActionData } from "react-router-dom";

const LoginPage = () => {
  const errors = useActionData();

  return (
    <>
      <Login errors={errors} />
    </>
  );
};
export default LoginPage;

export const action = async ({ request }) => {
  const data = await request.formData();
  const errors = {};

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resData = await response.json();
    if (response.status === 422) {
      errors.validation = resData.data[0].msg;
    }
    if (response.status === 401) {
      errors.email = resData.data[0].msg;
    }
    if (Object.keys(errors).length) {
      return errors;
    }

    localStorage.setItem("token", resData.token);
    localStorage.setItem("email", resData.email);
    localStorage.setItem("product", resData.productId);
    const expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    localStorage.setItem("expiration", expireDate.toISOString());
    return redirect("/");
  } catch (err) {
    console.log(err);
  }
};
