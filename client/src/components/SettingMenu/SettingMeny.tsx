import { FC, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'
import { NavLink, useNavigate } from 'react-router-dom'

import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import SwitchToogle from '../../atoms/SwitchToggle/SwitchToggle'
import ToggleTheam from '../../atoms/ToggleTheam/ToggleTheam'
import {
  changeOpenHeaderSeting,
  changeOpenOrCloseLoginPopup,
} from './StateElementSlice'

import workWithCookies from '../../utils/workWithCookies'

import ServiceBanyak from '../../service/ServiceBanyak'

import settingIconBlue from '../../image/header/setting_icon-blue.webp'
import chatIcon from '../../image/header/chat.svg'
import exitIcon from '../../image/header/exit.svg'

import './SettingMeny.scss'

const SettingMeny: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { headerSetting } = useAppSelector((state) => state.stateElement)
  const { userProfile } = useAppSelector((state) => state.userInfo)
  const { exitUser } = ServiceBanyak()
  const { getCookies } = workWithCookies()
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
      dispatch(changeOpenHeaderSeting(status))
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
              <SwitchToogle prop1={'УКР'} prop2={'ENG'} />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">
                Змінити тему
              </span>
              <ToggleTheam />
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

export default SettingMeny
