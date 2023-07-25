import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks';
import { changeTheam } from '../../components/SettingMenu/StateElementSlice';

import './ToggleTheam.scss';

import moonIcon from '../../image/header/moon.webp';
import sunIcon from '../../image/header/sun.webp';

const ToggleTheam: FC = () => {
  const dispatch = useAppDispatch();
  const {mainTheam} = useAppSelector(state => state.stateElement)

  const onToggle: MouseEventHandler<HTMLElement> = (e) => {
      if (mainTheam) {

        dispatch(changeTheam(false))
      } else {
        dispatch(changeTheam(true))
      }
  }

  return (
    <div className='toggle-theam'>
      <div 
        style={mainTheam ? {} : {'backgroundColor': '#1C145E', 'border': '1px solid #000'}}
        className='toggle-theam__container'
        onClick={onToggle}>
        <span onClick={onToggle} className={`toggle-theam__container-elem ${mainTheam ? true : false}`}>
          <img src={mainTheam ? sunIcon : moonIcon} alt="sun or moon" className='toggle-theam__container-elem-icon' />
        </span>
      </div>
    </div>
  )
}

export default ToggleTheam;