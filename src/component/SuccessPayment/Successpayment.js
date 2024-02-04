import classes from "./success.module.css";
const SuccessPayment = () => {
  return (
    <div className={classes.successContainer}>
      <div className={classes.successPayment}>
        <h3>สั่งสินค้าสำเร็จ</h3>
      </div>
    </div>
  );
};

export default SuccessPayment;
