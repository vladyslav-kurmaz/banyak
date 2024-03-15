import SettingMenu from '../SettingMenu/SettingMenu'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'
import { changeOpenOrCloseLoginPopup } from '../../store/stateElementSlice'

import logo from '../../image/logo/LOGO_Banyak.webp'

import './Header.scss'
import { selectUserInfo } from '../../store/userSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userProfile } = useAppSelector(selectUserInfo)

  const showLoginForm = () => {
    dispatch(changeOpenOrCloseLoginPopup(true))
    navigate('?login')
  }

  return (
    <header className="header">
      <NavLink to="/" className="header__main-link">
        <img src={logo} alt="Logo" className="header__main-link-logo" />
      </NavLink>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <NavLink
              to="/aboutus"
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              Про нас
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink
              to="/ideas"
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              Ідеї
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink
              to="/talents"
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
            >
              Таланти
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__settings">
        {userProfile === null ? (
          <NavLink
            to={'?login'}
            className="header__settings-login"
            onClick={showLoginForm}
          >
            Увійти
          </NavLink>
        ) : (
          <NavLink
            to={'/profile'}
            className="header__settings-login"
            onClick={showLoginForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="8" r="5" fill="#FCFCFC" />
              <rect x="4" y="14" width="12" height="2" fill="#FCFCFC" />
            </svg>
            Мій профіль
          </NavLink>
        )}
        <SettingMenu />
      </div>
    </header>
  )
}

export default Header
