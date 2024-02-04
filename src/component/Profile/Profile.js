import { useEffect, useState } from "react";
import classes from "./profile.module.css";
import { useDispatch } from "react-redux";
import { statusAction } from "../../Store/redux";
import { Form } from "react-router-dom";

const Profile = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.profileData.profile.name);
  const [address, setAddress] = useState(props.profileData.profile.address);
  const [postal, setPostal] = useState(props.profileData.profile.postal);
  const [tel, setTel] = useState(props.profileData.profile.telephone);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectData, setSelectData] = useState({
    province: props.profileData.profile.province,
    city: props.profileData.profile.city,
    district: props.profileData.profile.district,
  });
  const [updateStatus,setStatus] = useState(false)

  useEffect(() => {
    dispatch(statusAction.updateData({ profile: true, list: false }));
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch("http://13.250.122.193:8080/provinces", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setProvince(res.data);

    const selectCityId = res.data.find(
      (item) =>
        item.name_th ===
        (selectData.province !== "" ? selectData.province : "กรุงเทพมหานคร")
    );

    const responseCity = await fetch(
      `http://13.250.122.193:8080/provinces/${selectCityId.id}/city`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resCity = await responseCity.json();
    setCity(resCity.data);
    
    const selectDistrictId = resCity.data.find(
      (item) =>
        item.name_th === (selectData.city !== "" ? selectData.city : "เขตดุสิต")
    );
    const responseDistrict = await fetch(
      `http://13.250.122.193:8080/city/${selectDistrictId.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resDistrict = await responseDistrict.json();
    setDistrict(resDistrict.data);
    return (
      !postal ? setPostal(resDistrict.data[0].zip_code) : null,
      !province.length > 1 ? setProvince(res.data) : null
    );
  };

  const onChangeHandler = (e) => {
    const { name } = e.target;
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (name === "address") {
      setAddress(e.target.value);
    } else if (name === "zipcode") {
      setPostal(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    }
  };

  const onChangeProvince = async (e) => {
    const selectedProvince = e.target.value;
    const select = province.find((item) => item.name_th === e.target.value);
    const response = await fetch(
      `http://13.250.122.193:8080/provinces/${select.id}/city`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();

    const responseDistrict = await fetch(
      `http://13.250.122.193:8080/city/${res.data[0].id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resDistrict = await responseDistrict.json();
    setSelectData({ province: selectedProvince });
    setCity(res.data);
    setDistrict(resDistrict.data);
    setPostal(resDistrict.data[0].zip_code);
  };

  const onChangeCity = async (e) => {
    const cityValue = e.target.value;
    const select = city.find((item) => item.name_th === e.target.value);
    const response = await fetch(`http://13.250.122.193:8080/city/${select.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    const selectPostal = res.data.filter((item) => item.name_th === cityValue);
    setDistrict(res.data);
    setPostal(
      selectPostal.length !== 0 || res.data ? res.data[0].zip_code : ""
    );
    setSelectData((prev) => ({ ...prev, city: cityValue }));
  };

  const onChangeDistrict = (e) => {
    const name = e.target.value;
    const select = district.filter((item) => item.name_th === name);
    setSelectData((prev) => ({ ...prev, district: name }));
    setPostal(select[0].zip_code);
  };

  const onClickUpdateHandler = () => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 3000);
  };

  return (
    <div className={classes.infoUserContainer}>
      <h3>ข้อมูลส่วนตัว</h3>
      <div className={classes.userSendContainer}>
        {updateStatus && <p style={{color:'green',textAlign:'center'}}>อัพเดตข้อมูลเรียบร้อย</p>}
        <h5>ข้อมูลสำหรับการจัดส่ง</h5>
        <Form method="put">
          <div>
            <label htmlFor="">ชื่อ-นามสกุล</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="">ที่อยู่</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="">จังหวัด</label>
            <select
              onChange={onChangeProvince}
              name="province"
              value={selectData.province}
            >
              {province.map((item, index) => {
                return (
                  <option key={index} value={item.name_th}>
                    {item.name_th}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">อำเภอ</label>
            <select onChange={onChangeCity} name="city" value={selectData.city}>
              {city.map((item, index) => {
                return (
                  <option key={index} value={item.name_th}>
                    {item.name_th}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">ตำบล</label>
            <select
              onChange={onChangeDistrict}
              name="district"
              value={selectData.district}
            >
              {district.map((item, index) => {
                return (
                  <option key={index} value={item.name_th}>
                    {item.name_th}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">รหัสไปรษณีย์</label>
            <input
              type="text"
              name="zipcode"
              value={postal}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="">เบอร์โทรศัพท์</label>
            <input
              type="text"
              name="tel"
              value={tel}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit"  onClick={onClickUpdateHandler}>อัพเดตข้อมูล</button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
