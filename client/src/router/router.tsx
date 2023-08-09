import {
  createBrowserRouter
} from "react-router-dom";

import App from '../components/App/App';
import IdeasAndTalent from '../pages/IdeasAndTalentPage';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import AboutUs from '../pages/AboutUs';

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
        element: <IdeasAndTalent header={'Ideas'}/>,
        children: [

        ]
      },
      {
        path: '/talents',
        element: <IdeasAndTalent header={'Talent'}/>,
        children: [
          
        ]
      },
      {
        path: '/aboutus',
        element: <AboutUs/>,
      }
    ]
  },
  
  
]);

export default router;