import { FC, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'
import { NavLink, useNavigate } from 'react-router-dom'

import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import SwitchToggle from '../../atoms/SwitchToggle/SwitchToggle'
import ToggleTheme from '../../atoms/ToggleTheme/ToggleTheme'
import {
  changeOpenHeaderSetting,
  changeOpenOrCloseLoginPopup,
} from './StateElementSlice'

import ServiceBanyak from '../../service/ServiceBanyak'

import settingIconBlue from '../../image/header/setting_icon-blue.webp'
import chatIcon from '../../image/header/chat.svg'
import exitIcon from '../../image/header/exit.svg'

import './SettingMenu.scss'
import { selectUserInfo } from '../../store/userSlice'

const SettingMenu: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { headerSetting } = useAppSelector((state) => state.stateElement)
  const { userProfile } = useAppSelector(selectUserInfo)
  const { exitUser } = ServiceBanyak()
  const shouldShowPopup =
    new URLSearchParams(window.location.search).get('login') === 'true'

  const showLoginForm = () => {
    dispatch(changeOpenOrCloseLoginPopup(true))
  }

  const exitUserProfil = () => {
    exitUser()

    navigate('/')
  }

  const openCloseSettingMenu = useCallback(
    (status: boolean): void => {
      dispatch(changeOpenHeaderSetting(status))
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [headerSetting]
  )

  const renderSettingMenu = () => {
    return (
      <div
        onMouseEnter={() => openCloseSettingMenu(true)}
        onMouseLeave={() => openCloseSettingMenu(false)}
        className="header__settings-container-menu"
      >
        <div className="header__settings-container-menu-container">
          <span className="header__settings-container-menu-container-round"></span>
          <span className="header__settings-container-menu-container-line"></span>
          <ul className="header__settings-container-menu-container-list">
            <li className="header__settings-container-menu-container-list-item">
              {userProfile ? <ButtonSmall text="Чат" icon={chatIcon} /> : null}
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">
                Змінити мову
              </span>
              <SwitchToggle prop1={'УКР'} prop2={'ENG'} />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">
                Змінити тему
              </span>
              <ToggleTheme />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              {userProfile ? (
                <ButtonSmall
                  text="Вийти"
                  icon={exitIcon}
                  fn={() => exitUserProfil()}
                />
              ) : null}
            </li>
            <li className="header__settings-container-menu-container-list-item">
              {userProfile ? null : (
                <NavLink
                  // to={'/?showPopup=true'}
                  to={{
                    pathname: window.location.pathname,
                    search: shouldShowPopup ? '' : `login`,
                  }}
                  className="header__settings-container-menu-container-list-item-login"
                  onClick={showLoginForm}
                >
                  Увійти
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div
      className="header__settings-container"
      onMouseEnter={() => openCloseSettingMenu(true)}
      onMouseLeave={() => openCloseSettingMenu(false)}
    >
      <img
        src={settingIconBlue}
        className="header__settings-container-icon"
        alt="blue icon"
      />
      {headerSetting ? renderSettingMenu() : null}
    </div>
  )
}

export default SettingMenu
