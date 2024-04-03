import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkitHooks'
import { changeMainPreloader } from '../../store/stateElementSlice'
import { setUserProfile } from '../../store/userSlice'

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
import IdeaDescriptionPage from '../../pages/IdeaDescriptionPage/IdeaDescriptionPage'
import TalentDescriptionPage from '../../pages/TalentDescriptionPage/TalentDescriptionPage'
import { TUserProfile } from '../../types/types'

import './App.scss'

function App() {
  const { mainPreloader } = useAppSelector((state) => state.stateElement)

  const location = useLocation()
  const popupLocation =
    location.search === '?login' || location.search === '?signup'
  const { profileUser } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const [showPopup, setShowPopup] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getCookies('sessiontokenid')

    if (token !== null) {
      dispatch(changeMainPreloader(true))
      try {
        profileUser(token, 'GET').then((res) =>
          dispatch(setUserProfile(res as TUserProfile))
        )
        dispatch(changeMainPreloader(false))
      } catch (e) {
        dispatch(changeMainPreloader(false))
        console.error(e)
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (popupLocation) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [popupLocation])

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
            <Route
              path="ideas/:slug"
              element={<IdeaDescriptionPage isIdea={true} />}
            />
            <Route path="talents" element={<IdeasAndTalent isIdea={false} />} />
            <Route path="talents/:slug" element={<TalentDescriptionPage />} />
            <Route path="profile" element={<ProfilePage fc={setShowPopup} />} />
            <Route path="create-idea" element={<CreateIdea />} />
            <Route path="chose-profile" element={<ChooseProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
