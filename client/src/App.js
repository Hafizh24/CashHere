import { useDispatch } from "react-redux";
import AdminSettings from "./components/manageAdmin/adminSettings";
import ResetPasswordPage from "./components/manageAdmin/resetPassword";
import ManagerCashier from "./components/manageCashier/manageCashier";
import ManageProduct from "./components/manageProduct/manageProduct";
import Required from "./components/required";
import AdminDashboard from "./pages/adminDashboard";
import Home from "./pages/home";
import LoginAdmin from "./pages/loginAdmin";
import WelcomePage from "./pages/welcomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setData } from "./redux/userSlice";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage></WelcomePage>},
  { path: "/home", element: <Home></Home>},
  { path: "/admin-dashboard", element: <AdminDashboard></AdminDashboard>},
  { path: "/manage-cashier", element: <ManagerCashier></ManagerCashier>},
  { path: "/manage-product", element: <ManageProduct></ManageProduct>},
  { path: "/reset-password/:token", element: <ResetPasswordPage></ResetPasswordPage>},
  { path: "/admin-settings", element: <AdminSettings></AdminSettings>},
  { path: "/login-admin", element: <LoginAdmin></LoginAdmin>},
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
      const response = await axios.get("http://localhost:2000/user/keep-login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setData(response.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() =>{
    keepLogin();
  }, [])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
