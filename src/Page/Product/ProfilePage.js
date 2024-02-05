import { Suspense} from "react";
import Profile from "../../component/Profile/Profile";
import { getAuthToken } from "../../Util/Auth";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import LoadingPage from "../LoadingPage";

const ProfilePage = (props) => {
  const { data } = useLoaderData();
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {loadedData => <Profile profileData={loadedData} />}
      </Await>
    </Suspense>
  );
};

export default ProfilePage;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const token = getAuthToken();
  const productId = params.productId;

  const profileData = {
    name: data.get("name"),
    address: data.get("address"),
    postal: data.get("zipcode"),
    telephone: data.get("tel"),
    province: data.get("province").split(",")[0].trim(),
    city: data.get("city").split(",")[0].trim(),
    district: data.get("district"),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_GOODNUT_API}/product/profile/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(profileData),
      }
    );
    await response.json();
    return redirect(`/profile/${productId}`);
  } catch (err) {
    console.log(err);
  }
};

const loadData = async () => {
  const token = getAuthToken();
  const response = await fetch(`${process.env.REACT_APP_GOODNUT_API}/auth/user`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const responseData = await response.json();

  return responseData.user
}

export const loader = async () => {
  return defer({
    data: loadData()
  })
};
