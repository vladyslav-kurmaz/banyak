import { FC, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkidHooks";
import { NavLink } from "react-router-dom";
import { changeOpenOrCloseLoginPopup } from "./StateElementSlice";

import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";
import ToggleTheam from "../../atoms/ToggleTheam/ToggleTheam";
import { changeOpenHeaderSeting } from "./StateElementSlice";

import settingIconBlue from "../../image/header/setting_icon-blue.webp";
import chatIcon from "../../image/header/chat.svg";
import exitIcon from "../../image/header/exit.svg";

import "./SettingMeny.scss";

const SettingMeny: FC = () => {
  const dispatch = useAppDispatch();
  const { headerSetting } = useAppSelector((state) => state.stateElement);
  const { userId } = useAppSelector((state) => state.userInfo);
  const shouldShowPopup =
    new URLSearchParams(window.location.search).get("login") === "true";

  const showLoginForm = () => {
    dispatch(changeOpenOrCloseLoginPopup(true));
  };

  const test = () => {
    console.log(1);
  };

  const openCloseSettingMenu = useCallback(
    (status: boolean): void => {
      dispatch(changeOpenHeaderSeting(status));
      // eslint-disable-next-line
    },
    [headerSetting]
  );

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
              {userId ? <ButtonSmall text="Чат" icon={chatIcon} /> : null}
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">
                Змінити мову
              </span>
              <SwitchToogle prop1={"УКР"} prop2={"ENG"} />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">
                Змінити тему
              </span>
              <ToggleTheam />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              {userId ? (
                <ButtonSmall text="Вийти" icon={exitIcon} fn={test} />
              ) : null}
            </li>
            <li className="header__settings-container-menu-container-list-item">
              {userId ? null : (
                <NavLink
                  // to={'/?showPopup=true'}
                  to={{
                    pathname: window.location.pathname,
                    search: shouldShowPopup ? "" : `${"login"}=true`,
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
    );
  };

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
  );
};

export default SettingMeny;
