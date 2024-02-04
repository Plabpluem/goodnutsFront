import ListSelect from "../../Ul/ListSelect";
import classes from "./select.module.css";

const Select = () => {
  return (
    <div className={classes.selectContainer}>
      <ListSelect
        image='https://img2.pic.in.th/pic/nuts.jpeg'
        id={"product"}
        position={"0% 85%"}
        filter={{
          title: "Mixed Nuts",
          filter: ["Mixednuts", "CaramelMixnut", "CaramelCoffee"],
        }}
      >
        NUTS
      </ListSelect>
      <ListSelect image='https://img5.pic.in.th/file/secure-sv1/cereal.jpeg' id={"product"} position={"0% 35%"} filter={{
          title: "Cereal & cookies",
          filter: ["Cookiesingapore","Cerealcookies"],
        }}>
        CEREAL
      </ListSelect>
      <ListSelect image='https://img2.pic.in.th/pic/fruit.jpeg' id={"product"} position={"0% 40%"} filter={{
          title: "Dried Fruits",
          filter: ["Apricotdried","Cranberrydried"],
        }}>
        FRUIT
      </ListSelect>
    </div>
  );
};

export default Select;
