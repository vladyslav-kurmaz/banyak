import { FC } from 'react';

import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall';
import SwitchToogle from 'atoms/SwitchToggle/SwitchToggle';

import settingIconBlue from '../../image/header/setting_icon-blue.webp';
import chatIcon from '../../image/header/chat.svg';
import exitIcon from '../../image/header/exit.svg';

import './SettingMeny.scss';

const SettingMeny: FC = () => {

  const test = () => {
    console.log(1);
  }

  return (
    <div className='header__settings-container'>
      <img src={settingIconBlue} className='header__settings-container-icon' alt="blue icon" />
      <div className="header__settings-container-menu">    
        <div className="header__settings-container-menu-container">
          <span className='header__settings-container-menu-container-round'></span>
          <span className='header__settings-container-menu-container-line'></span>
          <ul className="header__settings-container-menu-container-list">
            <li className="header__settings-container-menu-container-list-item">
              <ButtonSmall text='Чат' icon={chatIcon}/>
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">Змінити мову</span>
              <SwitchToogle />
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <span className="header__settings-container-menu-container-list-item-text">Змінити тему</span>
              
            </li>
            <li className="header__settings-container-menu-container-list-item">
              <ButtonSmall text='Вийти' icon={exitIcon} fn={test}/>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
    
  )
}

export default SettingMeny;