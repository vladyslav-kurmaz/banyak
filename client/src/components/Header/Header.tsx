import SettingMeny from '../SettingMenu/SettingMeny';

import logo from '../../image/header/LOGO_Banyak.webp'


 
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
        <a href="#" className='header__main-link'>
          <img src={logo} alt="Logo" className='header__main-link-logo' />
        </a>

        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li className="header__nav-list-item"><a href="#">Про нас</a></li>
            <li className="header__nav-list-item"><a href="#">Ідеї</a></li>
            <li className="header__nav-list-item"><a href="#">Таланти</a></li>
          </ul>
        </nav>

        <div className='header__settings'>
          <button className='header__settings-login'>Увійти</button>
          

          <SettingMeny/>

        </div>

    </header>
  );
}

export default Header;