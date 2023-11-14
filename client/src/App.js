import { useDispatch } from "react-redux";
import AdminSettings from "./components/manageAdmin/adminSettings";
import ResetPasswordPage from "./components/resetPassword";
import ManagerCashier from "./components/manageCashier/manageCashier";
import Required from "./components/required";
import Home from "./pages/home";
import WelcomePage from "./pages/welcomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setData } from "./redux/userSlice";
import AddProduct from "./components/manageProduct/addProduct";
import LoginCashier from "./components/cashier/loginCashier";
import Profile from "./pages/Profile";
import ManageCategory from "./components/category/manageCategory";
import LoginCashier from "./components/cashier/loginCashier";
import LoginAdmin from "./components/manageAdmin/loginAdmin";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage></WelcomePage> },
  { path: "/home", element: <Home></Home> },
  { path: "/admin-dashboard", element: <AdminDashboard></AdminDashboard> },
  { path: "/manage-cashier", element: <ManagerCashier></ManagerCashier> },
  { path: "/manage-product", element: <ManageProduct></ManageProduct> },
  { path: "/reset-password/:email", element: <ResetPasswordPage></ResetPasswordPage> },
  { path: "/admin-settings", element: <AdminSettings></AdminSettings> },
  { path: "/login-admin", element: <LoginAdmin></LoginAdmin> },
  { path: "/login-cashier", element: <LoginCashier></LoginCashier> },
  { path: "/profile", element: <Profile /> },
  { path: "/manage-category", element: <ManageCategory /> },
  // { path: "/reset-password", element: <></>}
  { path: "/login-cashier", element: <LoginCashier></LoginCashier> },
  // { path: "/reset-password", element: <></>}
  {
    element: <Required></Required>,
    children: [
      //untuk yang butuh token
    ],
  },
]);

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      const response = await axios.get("http://localhost:2000/users/keep-login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setData(response.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
