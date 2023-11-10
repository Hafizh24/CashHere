import ManagerCashier from "./components/manageCashier/manageCashier";
import ManageProduct from "./components/manageProduct";
import Required from "./components/required";
import AdminDashboard from "./pages/adminDashboard";
import Home from "./pages/home";
import WelcomePage from "./pages/welcomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage></WelcomePage>},
  { path: "/home", element: <Home></Home>},
  { path: "/admin-dashboard", element: <AdminDashboard></AdminDashboard>},
  { path: "/manage-cashier", element: <ManagerCashier></ManagerCashier>},
  { path: "/manage-product", element: <ManageProduct></ManageProduct>},
  {
    element: <Required></Required>,
    children: [
      //untuk yang butuh token
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
