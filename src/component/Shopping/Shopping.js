import ProductItem from "../../Ul/ProductItem";
import classes from "./shopping.module.css";
import {useNavigate } from "react-router-dom";


const Shopping = (props) => {
  const navigate = useNavigate()
  
  const onReturn = () => {
    navigate('/')
  }
  return (
    <section className={classes.shoppingContainer}>
      <h1 className={classes.topicName}>{props.title}</h1>
      <ul>
        {props.datalist.map((item,index) => (
          <ProductItem {...item} key={index} />
        ))}
      </ul>
      <h3 className={classes.back} onClick={onReturn}>ไปที่หน้าหลัก</h3>
    </section>
  );
};

export default Shopping;
