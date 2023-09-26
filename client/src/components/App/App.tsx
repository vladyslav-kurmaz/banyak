import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxToolkidHooks";
import { changeOpenOrCloseLoginPopup } from "../SettingMenu/StateElementSlice";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainPage from "../../pages/MainPage/MainPage";
import AboutUs from "../../pages/AboutUs/AboutUs";
import SingUpPage from "../../pages/SingUpPage/SingUpPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import IdeasAndTalent from "../../pages/IdeasAndTalent/IdeasAndTalentPage";

import "./App.scss";

function App() {
  const { loginRegistrationForm, loginOrSingUp } = useAppSelector(
    (state) => state.stateElement
  );

  const location = useLocation();
  // const popupLocation = location.search === '?login' || location.search === '?singup'
  const popupLocation = location.search === '?login' || location.search === '?singup'
  
  const dispatch = useAppDispatch();
  // console.log(location);
  

  // useEffect(() => {
  //   console.log(popupLocation);
    
  //   if (popupLocation) {
  //     dispatch(changeOpenOrCloseLoginPopup(true));
  //   } else {
  //     dispatch(changeOpenOrCloseLoginPopup(false));
  //   }
  // }, [popupLocation]);

  return (
    <>
      {popupLocation && <SingUpPage />}

      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="ideas" element={<IdeasAndTalent type={true} />} />
            <Route path="talents" element={<IdeasAndTalent type={false} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
