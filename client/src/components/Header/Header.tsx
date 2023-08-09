import SettingMeny from "../SettingMenu/SettingMeny";
import { Link } from "react-router-dom";

import logo from "../../image/logo/LOGO_Banyak.webp";

import "./Header.scss";

const Header = () => {

  return (
    <header className="header">
      <Link to="/" className="header__main-link">
        <img src={logo} alt="Logo" className="header__main-link-logo" />
      </Link>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <Link to="/aboutus">Про нас</Link>
          </li>
          <li className="header__nav-list-item">
            <Link to="/ideas">Ідеї</Link>
          </li>
          <li className="header__nav-list-item">
            <Link to="/talents">Таланти</Link>
          </li>
        </ul>
      </nav>

      <div className="header__settings">
        <button className="header__settings-login">Увійти</button>

        <SettingMeny />
      </div>
    </header>
  );
};

export default Header;
