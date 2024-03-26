import Layout from "./Layout";
import LoginPage from "@/components/Login_Page/Login_Page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_page from "./components/Home_Page/Home_page";
import ProtectedRoute from "./components/Protected_Route/Protected_Routes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <>
        {/* <Home_page /> */}
        <ProtectedRoute element={<Home_page />} />
      </>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
