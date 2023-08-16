import React, { useEffect } from "react";
import { Routes, Outlet, Route } from "react-router-dom";
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
  const { loginRegistrationForm } = useAppSelector(
    (state) => state.stateElement
  );
  // const loginRegistrationFormTraslate = loginOrSingUp === 'ВХІД' ? 'login' : 'singup'
  const shouldShowPopup =
    new URLSearchParams(window.location.search).get("login") === "true";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldShowPopup) {
      dispatch(changeOpenOrCloseLoginPopup(true));
    } else {
      dispatch(changeOpenOrCloseLoginPopup(false));
    }
  }, [shouldShowPopup]);

  return (
    <>
      {loginRegistrationForm && shouldShowPopup && <SingUpPage />}
      {loginRegistrationForm
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "")}
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
