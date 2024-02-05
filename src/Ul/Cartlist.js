import React from 'react'
import { CSSTransition } from "react-transition-group";
import "./cartlist.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Store/redux";
import {useNavigate } from "react-router-dom";

const Cartlist = React.forwardRef((props,ref) => {
  const cart = useSelector((state) => state.cart);
  const discart = useDispatch()
  const navigate = useNavigate()

  const addHandler = (item) => {
    discart(cartAction.add({...item,amount:1}))
  }

  const removeHandle = id => {
    discart(cartAction.remove(id))
  }

  const onGotoCart = () => {
    navigate('/myCart')
    props.closeCart()
  }
  return (
    <CSSTransition
      in={props.show}
      timeout={{ enter: 600, exit: 600 }}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: "",
        exit: "",
        enterActive: "ModalOpen",
        exitActive: "ModalExit",
      }}
    >
      <div className="cardCart" ref={ref}>
        <ul className="Cartlist">
          {cart.items.length === 0 && <h2 className='avaiable'>Avaiable Cart</h2>}
          {cart.items.map((item,index) => (
            <li key={item.id}>
              <div className="detail">
                <img src={`${process.env.REACT_APP_GOODNUT_API}/${item.image[0]}`} alt="" />
                <div className="detailProduct">
                  <h5>{item.title}</h5>
                  <h5>รส : {item.flavor}</h5>
                  <p>ขนาด {item.size} / จำนวน {item.amount}</p>
                </div>
              </div>
              <div className="pricePlusDe">
                <h4 className="priceProduct">฿ {item.price * item.amount}</h4>
                <span onClick={removeHandle.bind(null,item.id)}>-</span>
                <span onClick={addHandler.bind(null,item)}>+</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="spaceAvailable"></div>
        <div className="summaryBtnDetail">
          <div className="summaryDetail">
            <h3>{cart.totalItem} ชิ้น</h3>
            <h3>ยอดรวมทั้งหมด: {cart.totalAmount} บาท</h3>
          </div>
          <button onClick={onGotoCart}>ไปที่ตระกร้า</button>
        </div>
      </div>
    </CSSTransition>
  );
});

export default Cartlist;
