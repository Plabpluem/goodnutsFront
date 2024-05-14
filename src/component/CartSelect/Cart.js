import { useDispatch, useSelector } from "react-redux";
import classes from "./cart.module.css";
import { cartAction } from "../../Store/redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getAuthToken } from "../../Util/Auth";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getAuthToken();
  const [error, setError] = useState('')

  const addHandler = (item) => {
    dispatch(cartAction.add({ ...item, amount: 1 }));
  };

  const removeHandler = (id) => {
    dispatch(cartAction.remove(id));
    // console.log(id)
  };

  const deleteItem = (id) => {
    dispatch(cartAction.delete(id));
  };

  const onChangeAmountHandler =(e,item)=> {
    const value = +e.target.value
    dispatch(cartAction.change({...item, amount: value}))
    const format = value.toString().padStart(1, '0');
    e.target.value = format
  }

  const conFirmOrder = (e) => {
    e.preventDefault();
    if (token === null) {
      navigate("/login");
      return;
    } else if (cart.items.length === 0) {
      setError('เลือกสินค้าก่อน')
      return;
    }

    fetch(`${process.env.REACT_APP_GOODNUT_API}/product/postCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        products: cart.items,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data to the server");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/confirmcart");
  };

  return (
    <div className={classes.cartContainer}>
      <h3>ตระกร้าสินค้า</h3>
      <div className={classes.cartandpayment}>
        <div className={classes.cart}>
          {cart.items.length === 0 && (
            <h2 className={classes.availiableCart}>ตระกร้าสินค้าว่าง</h2>
          )}
          {cart.items.map((item) => (
            <li key={item.id}>
              <div className={classes.detailCartItem}>
                <img src={`${process.env.REACT_APP_GOODNUT_API}/${item.image[0]}`} alt="" />
                <div className={classes.detailItem}>
                  <h4>{item.title}</h4>
                  <h5>
                    รส : {item.flavor} / ขนาด {item.size}
                  </h5>
                  <h5>จำนวน</h5>
                  <div className={classes.result}>
                    <div className={classes.btnPlusDe}>
                      {/* <span onClick={removeHandler.bind(null, item.id)}>-</span> */}
                      <span onClick={() => removeHandler(item.id)}>-</span>
                      <input type="number" value={item.amount} onChange={(e)=> onChangeAmountHandler(e,item)} />
                      <span onClick={addHandler.bind(null, item)}>+</span>
                    </div>
                    <h4>฿ {item.price * item.amount}</h4>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ color: "#50424c" }}
                  onClick={deleteItem.bind(null, item.id)}
                />
              </div>
            </li>
          ))}
        </div>

        <div className={classes.payment}>
          <div className={classes.resultPayment}>
            <h2>สรุปคำสั่งซื้อ {cart.totalItem} รายการ</h2>
            <div className={classes.totalAmount}>
              <h3>ยอดคำสั่งซื้อ</h3>
              <h3>฿ {cart.totalAmount}</h3>
            </div>
            <div className={classes.totalAmount}>
              <h3>ราคารวมทั้งหมด</h3>
              <h3>฿ {cart.totalAmount}</h3>
            </div>
          </div>
          <button onClick={conFirmOrder}>ดำเนินการชำระเงิน</button>
          <h5 style={{ color: 'red', fontSize: '18px', fontWeight: '100' }}>{error}</h5>
        </div>
      </div>
    </div>
  );
};

export default Cart;
