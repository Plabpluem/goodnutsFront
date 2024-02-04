import { useCallback, useState } from "react";
import classes from "./orderuser.module.css";
import { Pagination } from "../../Ul/pagination/usePagination";

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const OrderUser = (props) => {
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [dataOrder, setOrder] = useState(props.data);
  const [dataFilter, setDataFilter] = useState({
    day: range(1, 31),
    month: range(1, 12),
    year: range(2024, 2030),
    saveYear: 2024,
    saveMonth: 1,
  });
  const onChangePage = useCallback(
    (name) => {
      if (name === "prev" && page > 1) {
        setPage((prev) => prev - 1);
      } else if (name === "next") {
        setPage((prev) => prev + 1);
      }
    },
    [page]
  );

  const onFilterMonth = (e) => {
    const name = e.target.name;
    if(name === 'day'){
      const select = props.data.filter(
        (item) =>
        new Date(item.createdAt).getDay() === +e.target.value &&
          new Date(item.createdAt).getMonth() + 1 === dataFilter.saveMonth &&
          new Date(item.createdAt).getFullYear() === dataFilter.saveYear
      );
      setOrder(select);
    }
    else if (name === "month") {
      const select = props.data.filter(
        (item) =>
          new Date(item.createdAt).getMonth() + 1 === +e.target.value &&
          new Date(item.createdAt).getFullYear() === dataFilter.saveYear
      );
      setDataFilter(prev => ({...prev,saveMonth: +e.target.value}))
      setOrder(select);
    } else if (name === "year") {
      const select = props.data.filter(
        (item) => new Date(item.createdAt).getFullYear() === +e.target.value
      );
      setDataFilter((prev) => ({ ...prev, saveYear: +e.target.value }));
      setOrder(select);
    }
  };

  return (
    <div className={classes.orderlistContainer}>
      <h3>รายการสั่งซื้อลูกค้า</h3>
      <div className={classes.listContainer}>
        <div>
          <span>Filter</span>
          <label htmlFor="day">Day</label>
          <select name="day" onChange={onFilterMonth}>
            {dataFilter.day.map((day, index) => (
              <option value={day} key={index}>
                {day}
              </option>
            ))}
          </select>
          <label htmlFor="month">month</label>
          <select name="month" onChange={onFilterMonth}>
            {dataFilter.month.map((month, index) => (
              <option value={month} key={index}>
                {month}
              </option>
            ))}
          </select>
          <label htmlFor="year">Year</label>
          <select name="year" onChange={onFilterMonth}>
            {dataFilter.year.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <table>
          <tr>
            <th>ชื่อสินค้า</th>
            <th>จำนวน</th>
            <th>ราคาทั้งหมด</th>
            <th>ชื่อ- นามสกุล</th>
            <th>วันที่สั่งสินค้า</th>
            <th>ที่อยู่</th>
          </tr>
          {dataOrder.map((item) => {
            const date = new Date(item.createdAt);
            const pricePerEach = item.products.map(
              (item) => item.totalPrice * +item.quantity
            );
            return (
              <tr className={classes.detailBuyer}>
                <td>
                  {item.products.map((product) => {
                    return (
                      <>
                        <span>{product.product.title}</span>
                      </>
                    );
                  })}
                </td>
                <td>
                  {item.products.map((product) => {
                    return <span>{product.quantity}</span>;
                  })}
                </td>
                <td>
                  {pricePerEach.reduce((value, current) => value + current, 0)}
                </td>
                <td>{item.user.profile.name}</td>
                <td>
                  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}น.
                  <br></br>
                  {date.getDay()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
                </td>
                <td>
                  {item.user.profile.address}
                  <br></br>
                  {item.user.profile.city} {item.user.profile.district}{" "}
                  {item.user.profile.province} {item.user.profile.postal}
                  <br></br>
                  {item.user.profile.telephone}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <Pagination
        totalItem={totalItem}
        page={page}
        changePage={(newPage) => setPage(newPage)}
        changePageArrow={onChangePage}
      />
    </div>
  );
};

export default OrderUser;
