import { useDispatch } from "react-redux";
import classes from "./productitem.module.css";
import { cartAction} from "../Store/redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const productContain= useRef(null)
  const inputSize = useRef();
  const [imageData,setImageData] = useState(`http://13.250.122.193:8080/${props.image[0]}`)
  const [selectedSize, setSelectedSize] = useState(props.itemData[0].size.length>=1?props.itemData[0].size[0]:[]);
  useEffect((e)=>{
    setImageData(`http://13.250.122.193:8080/${props.image[0]}`)
    setSelectedSize(props.itemData[0].size.length>=1?props.itemData[0].size[0]:[])
  },[props.image,props.itemData])


  const selectSizeHandler = (item) => {
    setSelectedSize(item);
  };

  const submitTocartHandler = (e) => {
    e.preventDefault();
    const data = {
      title: props.title,
      price: selectedSize.length !== props.itemData[0].size.length ? props.itemData[0].price[props.itemData[0].size.indexOf(selectedSize)]: 180,
      flavor: props.itemData[0].flavor,
      size: selectedSize.length !== props.itemData[0].size.length ? inputSize.current.value: 180,
      image:[props.image[0]],
      id: props._id,
      amount: 1
    };
    console.log(data)
    dispatch(cartAction.add(data));
  };

  return (
    <li className={classes.productItem} ref={productContain}>
      <Link style={{width:'100%'}} to={`/product/${props.type}`}><LazyLoadImage src={imageData} alt="" /></Link>
      <form onSubmit={submitTocartHandler} className={classes.detailProduct}>
        <h3>{props.title}</h3>
        <div className={classes.selectSize}>
          {props.itemData[0].size && props.itemData[0].size.map((item,index) => (
            <button
              type="button"
              className={selectedSize === item ? classes.active : null}
              onClick={() => selectSizeHandler(item)}
              value={item}
              ref={selectedSize === item ? inputSize: null}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
        <h1>
          THB{" "} 
          {props.itemData[0].size.length === 0 ? props.itemData[0].price[0]:props.itemData[0].price[props.itemData[0].size.indexOf(selectedSize)]}
        </h1>
        <div className={classes.btnSubmit}>
          <button type="submit">ADD TO CART</button>
        </div>
      </form>
    </li>
  );
};

export default ProductItem;