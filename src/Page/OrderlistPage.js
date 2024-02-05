import { Await, defer, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../Util/Auth";
import Orderlist from "../component/Profile/Orderlist";
import { Suspense } from "react";
import LoadingPage from "./LoadingPage";

const OrderlistPage = () => {
  const { data } = useLoaderData();
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {(loadedData) => <Orderlist datalist={loadedData} />}
      </Await>
    </Suspense>
  );
};

export default OrderlistPage;

const loadData = async () => {
  const token = getAuthToken();
  const response = await fetch(
    `${process.env.REACT_APP_GOODNUT_API}/product/order`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const responseData = await response.json();
  return responseData.user;
};

export const loader = async () => {
  return defer({
    data: loadData(),
  });
};
