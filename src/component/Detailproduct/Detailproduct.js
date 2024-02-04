import { useRef, useState } from "react";
import Input from "../../Ul/Input";
import classes from "./detailproduct.module.css";
import ImageDetailProduct from "./ImageDetailProduct";
import { useDispatch } from "react-redux";
import { cartAction } from "../../Store/redux";
import { useParams, NavLink } from "react-router-dom";
import useCookie, { setCookie } from "react-use-cookie";

const Detailproduct = (props) => {
  const inputAmount = useRef();
  const sizeRefs = useRef();
  const flavorRefs = useRef();
  const dispatch = useDispatch();
  const param = useParams();
  const [selectIndexFlavor, setIndexFlavor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    props.itemData[selectIndexFlavor].size[0]
  );
  const [cartCookie, setCartCookie] = useCookie("token", []);
  const selectSizeBtnHandler = (selectItem) => {
    setSelectedSize(selectItem);
  };

  const [selectflavorBtn, setFlavorSelectBtn] = useState(
    props.itemData[0].flavor
  );

  const selectFlavorBtnHandler = (flavor, index) => {
    setFlavorSelectBtn(flavor);
    setIndexFlavor(index);
    setSelectedSize(props.itemData[index].size[0]);
  };

  const increaseValue = () => {
    const currentValue = +inputAmount.current.value;
    const incrementedValue = currentValue >= 99 ? 99 : currentValue + 1;
    inputAmount.current.value = incrementedValue;
  };
  const decreaseValue = () => {
    const currentValue = +inputAmount.current.value;
    const incrementedValue = currentValue === 1 ? 1 : currentValue - 1;
    inputAmount.current.value = incrementedValue;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      flavor: flavorRefs.current.value,
      size: selectedSize ? sizeRefs.current.value : 180,
      amount: +inputAmount.current.value,
      title: props.title,
      price: selectedSize
        ? props.itemData[selectIndexFlavor].price[
            props.itemData[selectIndexFlavor].size.indexOf(selectedSize)
          ]
        : props.itemData[selectIndexFlavor].price[0],
      id: props._id,
      image: props.image,
    };
    dispatch(cartAction.add(data));
    setCartCookie(JSON.stringify(data));
  };

  return (
    <main className={classes.detailContainer}>
      <ul className={classes.placeProduct}>
        <li>
          <NavLink to="/">GOODNUTS</NavLink>
        </li>
        <li>{param.productId}</li>
      </ul>
      <div className={classes.bothColumn}>
        <ImageDetailProduct slides={props.image} />
        <div className={classes.detailProduct}>
          <div className={classes.productname}>
            <h1>{props.title}</h1>
            <h3>
              THB{" "}
              {selectedSize
                ? props.itemData[selectIndexFlavor].price[
                    props.itemData[selectIndexFlavor].size.indexOf(selectedSize)
                  ]
                : props.itemData[selectIndexFlavor].price[0]}
            </h3>
            <p>{props.description}</p>
          </div>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes.selectsize}>
              <label htmlFor="size">เลือกขนาด</label>
              <div className={classes.size}>
                {props.itemData[selectIndexFlavor].size.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className={selectedSize === item ? classes.active : null}
                    onClick={() => selectSizeBtnHandler(item)}
                    ref={item === selectedSize ? sizeRefs : null}
                    value={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={classes.selectflavor}>
              <label htmlFor="flavor">เลือกรส</label>
              <div className={classes.flavor}>
                {props.itemData.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`${
                      selectflavorBtn === item.flavor ? classes.active : null
                    }`}
                    ref={item.flavor === selectflavorBtn ? flavorRefs : null}
                    onClick={() => selectFlavorBtnHandler(item.flavor, index)}
                    value={item.flavor}
                  >
                    {item.flavor}
                  </button>
                ))}
              </div>
            </div>
            <Input
              ref={inputAmount}
              label={"จำนวน"}
              plusValue={increaseValue}
              downValue={decreaseValue}
              input={{
                min: "1",
                max: "99",
                step: "1",
                defaultValue: "1",
                type: "number",
                id: props.id,
              }}
            />
            <button type="submit" className={classes.btnCart}>
              เพิ่มลงตระกร้า
            </button>
          </form>
        </div>
      </div>
      {/* <h3 className={classes.clickBack} onClick={onTurnBack}>ย้อนกลับ</h3> */}
    </main>
  );
};

export default Detailproduct;
