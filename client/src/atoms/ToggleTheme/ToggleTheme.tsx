import { FC, MouseEventHandler } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'
import { changeTheme } from '../../components/SettingMenu/StateElementSlice'

import './ToggleTheme.scss'

import moonIcon from '../../image/header/moon.webp'
import sunIcon from '../../image/header/sun.webp'

const ToggleTheme: FC = () => {
  const dispatch = useAppDispatch()
  const { mainTheme } = useAppSelector((state) => state.stateElement)

  const onToggle: MouseEventHandler<HTMLElement> = (e) => {
    if (mainTheme) {
      dispatch(changeTheme(false))
    } else {
      dispatch(changeTheme(true))
    }
  }

  return (
    <div className="toggle-theme">
      <div
        style={
          mainTheme
            ? {}
            : { backgroundColor: '#1C145E', border: '1px solid #000' }
        }
        className="toggle-theme__container"
        onClick={onToggle}
      >
        <span
          onClick={onToggle}
          className={`toggle-theme__container-elem ${mainTheme ? true : false}`}
        >
          <img
            src={mainTheme ? sunIcon : moonIcon}
            alt="sun or moon"
            className="toggle-theme__container-elem-icon"
          />
        </span>
      </div>
    </div>
  )
}

export default ToggleTheme
