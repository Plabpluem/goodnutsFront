import React, { useState } from "react";
import "./ProductPage.css";

import Shopping from "../../component/Shopping/Shopping";
import NavbarFilter from "../../component/NavbarFilter/NavbarFilter";
import testPic from "../../img/About.jpg";

import caramelmix from "../../img/sweetnuts/caramelmix (1).jpg";

import { useRouteLoaderData } from "react-router-dom";

const ProductMixnuts = () => {
  const dataRoute = useRouteLoaderData("product-list");
  const [navbarData, setNavbarData] = useState([
    "Mixednuts",
    "CaramelMixnut",
    "CaramelCoffee",
  ]);
  const onChangeFilterNavbar = data => {
    setNavbarData(data)
  }
  const data2 = dataRoute.filter((item) => navbarData.includes(item.type));


  return (
    <div className="containerShopping">
      <NavbarFilter changeFilterNavbar={onChangeFilterNavbar}/>
      <Shopping datalist={data2} title={"Mixnuts"} />
    </div>
  );
};

export default ProductMixnuts;

export const loadData = (id) => {};

export const loader = () => {
  const DATA = [
    {
      title: "Mixed Nuts",
      price: [165, 295, 445],
      img: testPic,
      flavor: "Original",
      size: ["150g", "300g", "500g"],
      id: "Mixednuts",
    },
    {
      title: "Caramel Mixnuts",
      price: [365],
      img: caramelmix,
      size: [240],
      id: "CaramelMixnut",
    },
  ];
  return DATA;
};
