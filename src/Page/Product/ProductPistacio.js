import React from 'react'
import './ProductPage.css'
import Shopping from '../../component/Shopping/Shopping'
import NavbarFilter from '../../component/NavbarFilter/NavbarFilter'
import macadamia from "../../img/macadamias/Goodnuts (55 of 145).jpg";
import caramelmac from '../../img/sweetnuts/caramelmac.jpg'
import {useRouteLoaderData } from 'react-router-dom'

const ProductPistachio = () =>{
    const data = useRouteLoaderData('product-list')
    const dataProduct = data.filter(item => ['Pistachio'].includes(item.type))

    return (
        <div className="containerShopping">
            <NavbarFilter />
            <Shopping datalist={dataProduct} title={'Pistachio'} />
        </div>
    )
}

export default ProductPistachio

export const loader = () => {
    const DATA = [
      {
        title: "Macadamia",
        price: [835, 510, 265],
        img: macadamia,
        size: [500, 300, 150],
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