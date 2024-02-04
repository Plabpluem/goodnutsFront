import React from "react";
import "./ProductPage.css";
import Shopping from "../../component/Shopping/Shopping";
import NavbarFilter from "../../component/NavbarFilter/NavbarFilter";
import macadamia from "../../img/macadamias/Goodnuts (55 of 145).jpg";
import caramelmac from "../../img/sweetnuts/caramelmac.jpg";
import { useRouteLoaderData } from "react-router-dom";

const ProductMacadamia = () =>{
    const data = useRouteLoaderData('product-list')
    const dataProduct = data.filter(item => ['Macadamia','CaramelMacadamia'].includes(item.type))

    return (
        <div className="containerShopping">
            <NavbarFilter />
            <Shopping datalist={dataProduct} title={'Macadamia'} />
        </div>
    )
}

export default ProductMacadamia

export const loader = () => {
    const DATA = [
      {
        title: "Macadamia",
        price: [265,510,835],
        img: macadamia,
        flavor: "Original",
        size: ['150g','300g','500g'],
      },
      {
        title: "Caramel Macadamia",
        price: [550],
        img: caramelmac,
        size: [240],
      },
      ];
    return DATA
}