import SettingMeny from "../SettingMenu/SettingMeny";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkidHooks";
import { changeOpenOrCloseLoginPopup } from "../SettingMenu/StateElementSlice";

import logo from "../../image/logo/LOGO_Banyak.webp";

import "./Header.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showLoginForm = () => {
    dispatch(changeOpenOrCloseLoginPopup(true));
    navigate('?login')
  };

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
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
            >Про нас</NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink 
              to="/ideas" 
              className={({ isActive, isPending }) => 
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
            >Ідеї</NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink 
              to="/talents"
              className={({ isActive, isPending }) => 
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
            >Таланти</NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__settings">
        <NavLink
          to={'?login'}
          className="header__settings-login"
          onClick={showLoginForm}
        >
          Увійти
        </NavLink>

        <SettingMeny />
      </div>
    </header>
  );
};

export default Header;
