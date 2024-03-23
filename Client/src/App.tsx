import Layout from "./Layout";
import LoginPage from "@/components/Login_Page/Login_Page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home_page from "./components/Home_Page/Home_page";

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
      <Home_page />
      // <Layout>
      // </Layout>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
