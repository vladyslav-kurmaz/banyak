import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkidHooks'
import { changreMainPreloader } from '../SettingMenu/StateElementSlice'
import { changeUserProfile } from '../../store/userSlice'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MainPage from '../../pages/MainPage/MainPage'
import AboutUs from '../../pages/AboutUs/AboutUs'
import SingUpPage from '../../pages/SingUpPage/SingUpPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import IdeasAndTalent from '../../pages/IdeasAndTalent/IdeasAndTalentPage'
import CreateIdea from '../../pages/CreateIdea/CreateIdea'
import Preloader from '../Preloader/Preloader'
import IdeasPopup from '../IdeasPopup/IdeasPopup'

import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'

import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import ChooseProfilePage from '../../pages/ChooseProfilePage/ChooseProfilePage'
import ButtonChooseProfile from '../../atoms/ButtonChooseProfile/ButtonChooseProfile'
import IdeaDescriptionPage from '../../pages/IdeaDescriptionPage/IdeaDescriptionPage'

import './App.scss';
import { TUserProfile } from '../../types/types'

function App() {
  const { mainPreloader } = useAppSelector((state) => state.stateElement)

  const location = useLocation();
  const popupLocation =
    location.search === '?login' || location.search === '?singup'
  const { profileUser } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const [showPopup, setShowPopup] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getCookies('sessiontokenid')

    if (token !== null) {
      dispatch(changreMainPreloader(true))
      try {
        profileUser(token, 'GET').then((res) =>
          dispatch(changeUserProfile(res as TUserProfile))
        )
        dispatch(changreMainPreloader(false))
      } catch (e) {
        dispatch(changreMainPreloader(false))
        console.error(e)
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {popupLocation && <SingUpPage />}
      {mainPreloader && <Preloader />}
      {showPopup ? <IdeasPopup closeModal={setShowPopup} /> : null}

      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="ideas" element={<IdeasAndTalent isIdea={true} />} />
            <Route path="ideas/:slug" element={<IdeaDescriptionPage />} />
            <Route path="talents" element={<IdeasAndTalent isIdea={false} />} />
            <Route path="profile" element={<ProfilePage fc={setShowPopup} />} />
            <Route path="create-idea" element={<CreateIdea />} />
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
  )
}

export default App
