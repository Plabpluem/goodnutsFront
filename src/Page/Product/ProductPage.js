import React, { Suspense,useEffect, useState } from "react";
import "./ProductPage.css";
import Shopping from "../../component/Shopping/Shopping";
import NavbarFilter from "../../component/NavbarFilter/NavbarFilter";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import {useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

const ProductPage = () => {
  const {data} = useRouteLoaderData("product-list");
  const status = useSelector((state) => state.status);
  const [navbarData, setNavbarData] = useState([
    "Mixednuts",
    "CaramelMixnut",
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
  const [titleData, setTitleData] = useState("สินค้าทั้งหมด");
  useEffect(() => {
    setNavbarData(status.filterProduct);
    setTitleData(status.filterTitle);
  }, [status]);
  const onChangeFilterNavbar = (data) => {
    setNavbarData(data);
  };
  const onChangeTitle = (data) => {
    setTitleData(data);
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="containerShopping">
        <NavbarFilter
          changeFilterNavbar={onChangeFilterNavbar}
          changeTitle={onChangeTitle}
        />
      <Await resolve={data}>
        {loadevent => <Shopping datalist={loadevent.filter((item) => navbarData.includes(item.type))} title={titleData} />}
      </Await>
      </div>
    </Suspense>
  );
};

export default ProductPage;

const loadData = async() => {
  const response = await fetch(
    "http://13.250.122.193:8080/product/product",
    {
      headers: {
        'Content-Type':'application/json'
      },
    }
  );
  if (!response.ok) {
    throw new Error("Loading product Error");
  }
  const responseData = await response.json();
  return responseData.products;
}

export const loader = async () => {
  return defer({
    data: loadData()
  })
};
