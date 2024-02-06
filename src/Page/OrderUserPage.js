import { Await, defer,useLoaderData } from "react-router-dom";
import OrderUser from "../component/OrderUser/OrderUser";
import { Suspense } from "react";
import LoadingPage from "./LoadingPage";

const OrderUserPage = () => {
  const { data } = useLoaderData();
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {(loadData) => <OrderUser data={loadData} />}
      </Await>
    </Suspense>
  );
};

export default OrderUserPage;

const loadData = async () => {
  const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/product/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Loading orders error");
  }
  const responseData = await response.json();
  return responseData.order;
};

export const loader = async () => {
  return defer({
    data: loadData(),
  });
};
