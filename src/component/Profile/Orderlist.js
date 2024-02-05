import { useDispatch } from "react-redux";
import classes from "./orderlist.module.css";
import { useCallback, useEffect, useState } from "react";
import { statusAction } from "../../Store/redux";
import { getAuthToken } from "../../Util/Auth";
import { Pagination } from "../../Ul/pagination/usePagination";

const Orderlist = ({ datalist }) => {
  const dispatch = useDispatch();
  const [dataOrder, setDataOrder] = useState(datalist);
  const [totalItem, setTotalItem] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(statusAction.updateData({ profile: false, list: true }));
    loadOrder();
  }, [page]);

  const loadOrder = async () => {
    const token = getAuthToken();
    const response = await fetch(
      `${process.env.REACT_APP_GOODNUT_API}/product/order?page=` + page,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const responseData = await response.json();
    setDataOrder(responseData.user);
    setTotalItem(responseData.totalItem);
  };

  const onChangePageArrow = useCallback(
    (name) => {
      if (name === "prev" && page > 1) {
        setPage((prev) => prev - 1);
      } else if (name === "next") {
        setPage((prev) => prev + 1);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    [page]
  );

  const onChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  console.log(dataOrder)

  return (
    <div className={classes.orderlistContainer}>
      <h3>รายการสั่งซื้อ</h3>
      <div className={classes.listContainer}>
        {dataOrder.length === 0 && <h3 className={classes.list}>No Order</h3>}
        {dataOrder &&
          dataOrder.map((item, index) => {
            return (
              <div className={classes.list} key={index}>
                {item.products.map((product, index) => {
                  return (
                    <div className={classes.countProduct} key={index}>
                      <img
                        src={`${process.env.REACT_APP_GOODNUT_API}/${product.product.image[0]}`}
                        alt=""
                      />
                      <section>
                        <span>Order-Id {item._id}</span>
                        <span>
                          {product.product.title} จำนวน {product.quantity} ชิ้น
                        </span>
                      </section>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <Pagination
        totalItem={totalItem}
        page={page}
        changePage={(newPage) => onChangePage(newPage)}
        changePageArrow={onChangePageArrow}
      />
    </div>
  );
};

export default Orderlist;
