import { useDispatch, useSelector } from "react-redux";
import classes from "./cartConfirm.module.css";
import {useState } from "react";
import { getAuthToken } from "../../Util/Auth";
import { cartAction } from "../../Store/redux";

const CartConfirm = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = getAuthToken();
  const [isLoading, setLoading] = useState(false);

  const onSubmitCheckout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/product/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(cartAction.reset());
        setLoading(true)
        window.location.href = await data.sessionId;
      } else {
        console.log("Failed to create checkout session");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={isLoading ? `${classes.confirmcartContainer} ${classes.spinner}` : classes.confirmcartContainer}>
      <h3>ตรวจสอบเพื่อยืนยันการสั่งซื้อ</h3>
      {(!isLoading && cart.items.length === 0) && <h4>ไม่มีสินค้า</h4>}
      {cart.items.length >0 && <div>
        <div className={classes.header}>
          <h5>สินค้า</h5>
          <h5>ราคาต่อชิ้น</h5>
          <h5>จำนวน</h5>
          <h5>ยอดรวม</h5>
        </div>
        <div className={classes.product}>
          {cart.items.map((item) => (
            <div key={item.id} className={classes.productlist}>
              <div className={classes.imageDetail}>
                <img src={`${process.env.REACT_APP_GOODNUT_API}/${item.image[0]}`} alt="" />
                <div>
                  <h5>{item.title} </h5>
                  <p>รส {item.flavor}</p>
                </div>
              </div>
              <h5>{item.price}</h5>
              <h5>{item.amount}</h5>
              <h5>฿ {item.amount * item.price}</h5>
            </div>
          ))}
        </div>
        <div className={classes.summary}>
          <div className={classes.summaryBox}>
            <div className={classes.priceTotal}>
              <span>ยอดรวมทั้งหมด </span>
              <span>{cart.totalAmount.toFixed(2)} ฿</span>
            </div>
            <div className={classes.priceSummaryTotal}>
              <span>ยอดรวมสุทธิ </span>
              <span>{cart.totalAmount.toFixed(2)} ฿</span>
            </div>
          </div>
        </div>
        <button type="submit" onClick={onSubmitCheckout}>
          ดำเนินการชำระเงิน
        </button>
      </div>}
    </div>
  );
};

export default CartConfirm;
