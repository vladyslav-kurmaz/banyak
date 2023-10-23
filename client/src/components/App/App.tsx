import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../hooks/reduxToolkidHooks";
import { changeOpenOrCloseLoginPopup } from "../SettingMenu/StateElementSlice";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainPage from "../../pages/MainPage/MainPage";
import AboutUs from "../../pages/AboutUs/AboutUs";
import SingUpPage from "../../pages/SingUpPage/SingUpPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import IdeasAndTalent from "../../pages/IdeasAndTalent/IdeasAndTalentPage";

import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../untils/workWithCookies";

import "./App.scss";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ChooseProfilePage from "../../pages/ChooseProfilePage/ChooseProfilePage";
import ButtonChooseProfile from "../../atoms/ButtonChooseProfile/ButtonChooseProfile";

function App() {
  const { loginRegistrationForm, loginOrSingUp } = useAppSelector(
    (state) => state.stateElement
  );

  const location = useLocation();
  // const popupLocation = location.search === '?login' || location.search === '?singup'
  const popupLocation =
    location.search === "?login" || location.search === "?singup";
  const whyAreYou = location.search === "?why-are-you";
  const { loginUser } = ServiceBanyak();
  const { getCookies } = workWithCookies();

  const dispatch = useAppDispatch();
  // console.log(location);

  useEffect(() => {
    if (getCookies("_id") !== null) {
    }
  }, []);

  return (
    <>
      {popupLocation && <SingUpPage />}
      {whyAreYou}

      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="ideas" element={<IdeasAndTalent type={true} />} />
            <Route path="talents" element={<IdeasAndTalent type={false} />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="chose-profile"
              element={
                <ChooseProfilePage
                  buttonOne={
                    <ButtonChooseProfile
                      text="Опублікувати ідею та знайти фахівців для реалізації проєкта"
                      type={false}
                    />
                  }
                  buttonTwo={
                    <ButtonChooseProfile
                      text="Знайти проєкт для отримання досвіду роботи в IT команді"
                      type={true}
                    />
                  }
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
