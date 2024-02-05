import { useRef, useState } from "react";
import classes from "./addproduct.module.css";
import { Form } from "react-router-dom";
import { getAuthToken } from "../../Util/Auth";

const AddProduct = () => {
  const [fileImage, setfileImage] = useState([]);
  const [priceProduct, setPrice] = useState([]);
  const [sizeProduct, setSize] = useState([]);
  const [itemData, setItemData] = useState([]);

  const inputText = useRef("");
  const inputPrice = useRef("");
  const inputSize = useRef("");
  const inputFlavor = useRef("");
  const inputType = useRef("");
  const inputDescription = useRef("");
  // รับค่าContext
  const [error, setError] = useState("");

  const onChangeImageHandler = (e) => {
    const fileList = e.target.files;
    if (fileList) {
      setfileImage([...fileList, ...fileImage]);
    }
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    const nameAttribute = e.target.getAttribute("name");
    const valueRemove = e.target.getAttribute("value");
    if (nameAttribute === "price") {
      const index = priceProduct.findIndex((item) => item === valueRemove);
      const selectSize = sizeProduct.filter(
        (item) => item !== sizeProduct[index]
      );
      const selectPrice = priceProduct.filter((p) => p !== valueRemove);
      setSize(selectSize);
      setPrice(selectPrice);
    } else if (nameAttribute === "size") {
      const index = sizeProduct.findIndex((item) => item === valueRemove);
      const selectPrice = priceProduct.filter(
        (item) => item !== priceProduct[index]
      );
      const selectSize = sizeProduct.filter((p) => p !== valueRemove);
      setSize(selectSize);
      setPrice(selectPrice);
    }
  };

  const addPriceSizeHandler = (e) => {
    e.preventDefault();
    if (inputPrice.current.value.length > 0) {
      setPrice([...priceProduct, inputPrice.current.value]);
      inputPrice.current.value = "";
    }
    if (inputSize.current.value.length > 0) {
      setSize([...sizeProduct, inputSize.current.value]);
      inputSize.current.value = "";
    }
  };

  const addItemDataHandler = (e) => {
    setItemData([
      ...itemData,
      {
        flavor: inputFlavor.current.value,
        price: priceProduct,
        size: sizeProduct,
      },
    ]);
    setPrice([]);
    setSize([]);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    const token = getAuthToken();
    // const Data = {
    //   title: inputText.current.value,
    //   description: inputDescription.current.value,
    //   type: inputType.current.value,
    //   itemData: itemData.map((item) => {
    //     return {
    //       flavor: item.flavor,
    //       price: item.price,
    //       size: item.size,
    //     };
    //   }),
    // };
    formData.append("title", inputText.current.value);
    formData.append("type", inputType.current.value);
    formData.append("description", inputDescription.current.value);
    formData.append("itemData", JSON.stringify(itemData));

    fileImage.forEach((image, index) => {
      formData.append("image", image);
    });
    try {
      const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/product/create`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      const resData = await response.json();
      console.log(resData);
      if (resData.status === 422) {
        setError("422 Unprocessable");
        return;
      }
      if (resData.status === 401 || resData.message) {
        setError(resData.message);
        return;
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    } finally {
      inputText.current.value = null;
      inputType.current.value = null;
      setfileImage([]);
      setItemData([]);
    }
  };
  return (
    <div className={classes.registorContainer}>
      <h3>เพิ่ม Product</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={submitHandler}>
        <div className={classes.InfoInput}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="ป้อน product"
            ref={inputText}
          />
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="price">อัพโหลดรูป</label>
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            required
            multiple
            onChange={onChangeImageHandler}
          />
          {fileImage.map((file, i) => (
            <p key={i}>{file.name}</p>
          ))}
          {fileImage.map((image, i) => (
            <img key={i} src={URL.createObjectURL(image)} alt="" />
          ))}
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="price">description</label>
          <input
            type="text"
            ref={inputDescription}
            name="description"
            placeholder="ป้อนรายละเอียด"
          />
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="type">type</label>
          <input type="text" name="type" ref={inputType} />
        </div>
        <div className={classes.InfoInput}>
          <label htmlFor="flavor">flavor</label>
          <select name="flavor" ref={inputFlavor}>
            <option value="Original">Original</option>
            <option value="Truffle">Truffle</option>
            <option value="Wasabi">Wasabi</option>
            <option value="Pizza">Pizza</option>
            <option value="Cheese Bacon">Cheese Bacon</option>
            <option value="Sour Cream">Sour Cream</option>
            <option value="Caramel">Caramel</option>
            <option value="Holweet and Perilla">Holweet and Perilla</option>
            <option value="Baked Honey">Baked Honey</option>
            <option value="Chocolate Chip">Chocolate Chip</option>
          </select>
          <br></br>
          <label htmlFor="price">price</label>
          <input
            type="text"
            placeholder="ป้อนราคา"
            name="price"
            ref={inputPrice}
          />
          <label htmlFor="price">size</label>
          <select name="price" ref={inputSize}>
            <option value="150g">150g</option>
            <option value="240g">240g</option>
            <option value="300g">300g</option>
            <option value="500g">500g</option>
            <option value="8 piece">8 piece</option>
            <option value="12 piece">12 piece</option>
          </select>
          <br></br>
          <div className={classes.listdataProduct}>
            {priceProduct.map((price, index) => (
              <li key={index}>
                <span onClick={onDeleteHandler} name="price" value={price}>
                  {price} บาท
                </span>
                <span
                  name="size"
                  onClick={onDeleteHandler}
                  value={sizeProduct[index]}
                >
                  {sizeProduct[index]}
                </span>
              </li>
            ))}
          </div>
          <button type="button" onClick={addPriceSizeHandler}>
            Add Price and Size
          </button>
          <button type="button" onClick={addItemDataHandler}>
            Add itemData
          </button>
        </div>
        <button type="submit">Add product</button>
      </Form>
    </div>
  );
};

export default AddProduct;
