import { createBrowserRouter } from "react-router-dom";

import App from "../components/App/App";
import IdeasAndTalent from "../pages/IdeasAndTalent/IdeasAndTalentPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainPage from "../pages/MainPage/MainPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import SingUpPage from "../pages/SingUpPage/SingUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/ideas",
        element: <IdeasAndTalent type={true} />,
        children: [],
      },
      {
        path: "/talents",
        element: <IdeasAndTalent type={false} />,
        children: [],
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
    ],
  },

  // {
  //   path: '/login',
  //   element: (
  //     <SingUpPage/>

  //   ),
  // },
  // {
  //   path: '/singup',
  //   element: (
  //     <SingUpPage/>

  //   ),
  // }
]);

export default router;
