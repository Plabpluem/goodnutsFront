import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DetailProductPage from "./Page/DetailProductPage";
import { Provider } from "react-redux";
import store from "./Store/redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootlayOut from "./Page/Rootlayout";
import RootlayOutProduct from "./Page/RootlayoutProduct";
import RegisterPage from "./Page/RegisterPage";
import CartPage from "./Page/CartPage";
import { UserAuthProvider } from "./Context/Authredux";
import { checkAuthToken } from "./Util/Auth";
import LoginPage, { action as LoginAction } from "./Page/LoginPage";
import { action as logoutAction } from "./Page/Logout";
import AddProductPage from "./Page/AddproductPage";
import ConfirmCart from "./Page/ConfirmCart";
import ProfilePage, {
  action as ProfileAction,
  loader as ProfileLoader,
} from "./Page/Product/ProfilePage";
import OrderlistPage, { loader as OrderlistData } from "./Page/OrderlistPage";
import RootlayOutProfile from "./Page/RootlayoutProfile";
import ResetPasswordPage from "./Page/ResetPasswordPage";
import ResetPage from "./Page/ResetPage";
import { Helmet } from "react-helmet";
import logo from "../src/img/GoodnutsLogo.png";
import LoadingPage from "./Page/LoadingPage";
import OrderUserPage, { loader as OrderallData } from "./Page/OrderUserPage";
import ProductPage,{loader as ProductData} from './Page/Product/ProductPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootlayOut />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: LoginAction,
      },
      {
        path: "/reset",
        element: <RootlayOutProduct />,
        children: [
          {
            index: true,
            element: <ResetPage />,
          },
          {
            path: ":tokenId",
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        path: "/myCart",
        element: <CartPage />,
      },
      {
        path: "confirmcart",
        element: <ConfirmCart />,
      },
      {
        path: "/profile",
        element: <RootlayOutProfile />,
        children: [
          {
            path: ":productId",
            element: <ProfilePage />,
            action: ProfileAction,
            loader: ProfileLoader,
          },
          {
            path: "orderlist",
            element: <OrderlistPage />,
            loader: OrderlistData,
          },
        ],
      },
      {
        path: "/product",
        id: "product-list",
        element: <RootlayOutProduct />,
        loader: ProductData,
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: ":productId",
            element: <DetailProductPage />,
          },
        ],
      },
      {
        path: "addproduct",
        element: <AddProductPage />,
        loader: checkAuthToken,
      },
      {
        path: "orderuser",
        element: <OrderUserPage />,
        loader: OrderallData,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <UserAuthProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Goodnuts</title>
        <link rel="icon" href={logo} sizes="16x16" />
      </Helmet>
      <RouterProvider router={router} />
    </UserAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
