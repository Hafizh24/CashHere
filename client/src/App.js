import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
