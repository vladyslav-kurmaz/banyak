import {
  createBrowserRouter
} from "react-router-dom";

import App from '../components/App/App';
import IdeasAndTalent from '../pages/IdeasAndTalentPage';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import AboutUs from '../pages/AboutUs';
import SingUpPage from "../pages/SingUpPage";


const router = createBrowserRouter(
[
  {
    path: '/',
    element: <App/>,   
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <MainPage/>,
      },
      {
        path: '/ideas',
        element: <IdeasAndTalent type={true}/>,
        children: [

        ]
      },
      {
        path: '/talents',
        element: <IdeasAndTalent type={false}/>,
        children: [
          
        ]
      },
      {
        path: '/aboutus',
        element: <AboutUs/>,
      },
      
      
    ]
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