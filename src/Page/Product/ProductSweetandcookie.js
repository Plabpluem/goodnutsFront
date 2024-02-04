import React from 'react'
import './ProductPage.css'
import Shopping from '../../component/Shopping/Shopping'
import NavbarFilter from '../../component/NavbarFilter/NavbarFilter'
import { Navigate,useRouteLoaderData } from 'react-router-dom'
import { GetAuthToken } from '../../Util/Auth'

const ProductSweetandcookie = () =>{
    const data = useRouteLoaderData('product-list')
    const dataProduct = data.filter(item => ['CaramelMacadamia','CaramelMixnut','CaramelCoffee','Cerealcookies','Cookiesingapore'].includes(item.id))


    return (
        <div className="containerShopping">
            <NavbarFilter />
            <Shopping datalist={dataProduct} title={'Sweet and Cookies'} />
        </div>
    )
}

export default ProductSweetandcookie

export const loader = async() => {
  const authCheck = GetAuthToken();
  if (authCheck === null) {
      return <Navigate to='/product' />;
  }

  return null
}