import { Outlet } from "react-router-dom";
import HeaderProfile from "../Ul/HeaderProfile";

const RootlayOutProfile = () => {
  return (
    <>
      <HeaderProfile />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default RootlayOutProfile;
