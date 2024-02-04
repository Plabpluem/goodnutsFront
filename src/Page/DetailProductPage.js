import {
  Await,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import Detailproduct from "../component/Detailproduct/Detailproduct";
import { Suspense } from "react";
import LoadingPage from "./LoadingPage";

const DetailProductPage = ({ params }) => {
  const { data } = useRouteLoaderData("product-list");
  const { productId } = useParams();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {loaddata => {
          const event = loaddata.find((item) => item.type === productId);
          return <Detailproduct {...event} />
        } }
      </Await>
    </Suspense>
  );
};

export default DetailProductPage;