import { Outlet, useLocation, useSubmit } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import NavbarTop from "../component/NavbarTop/NavbarTop";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthToken, loadAuthToken } from "../Util/Auth";
const RootlayOut = () => {
  const cart = useSelector((state) => state.cart);
  const submit = useSubmit();
  const tokenDuration = loadAuthToken();
  const token = getAuthToken();

  const [test, setTest] = useState();

  const totalItem = cart.items.reduce((current, e) => {
    return current + e.amount;
  }, 0);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit,tokenDuration]);

  const onChangeData = (data) => {
    setTest(data);
  };

  return (
    <div>
      <Header totalItem={totalItem} />
      <NavbarTop data={onChangeData} />
      <main>
        <Outlet data={test} />
      </main>
      <Footer />
    </div>
  );
};

export default RootlayOut;
