import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'
import {
  changeLanguage,
  changeStatusInstr,
  changeLoginOrSingUp,
} from '../../store/stateElementSlice'
import {
  selectUserInfo,
  setTypeUser,
  setUserProfile,
} from '../../store/userSlice'

import './SwitchToggle.scss'

type SwitchToggle = {
  prop1: string
  prop2: string
}

const SwitchToggle: FC<SwitchToggle> = ({ prop1, prop2 }) => {
  const dispatch = useAppDispatch()
  const { mainLanguage, statusInstr, loginOrSingUp } = useAppSelector(
    (state) => state.stateElement
  )
  const { typeUser, userProfile } = useAppSelector(selectUserInfo)
  const translateTypeUser = typeUser ? 'Я талант' : 'Я власник ідеї'

  const changeActiveLanguage = (status: string) => {
    if (
      status === mainLanguage ||
      status === statusInstr ||
      status === loginOrSingUp ||
      status === translateTypeUser
    ) {
      return {
        backgroundColor: '#1C145E',
        border: '2px solid #1C145E',
        color: '#fff',
      }
    } else {
      return {}
    }
  }

  const changeLang = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const propValue = target.getAttribute('data-prop')

    switch (propValue) {
      case 'Власник ідеї':
      case 'Талант':
        dispatch(changeStatusInstr(propValue))
        break
      case 'УКР':
      case 'ENG':
        dispatch(changeLanguage(propValue))
        break
      case 'РЕЄСТРАЦІЯ':
      case 'ВХІД':
        dispatch(changeLoginOrSingUp(propValue))
        break
      case 'Я власник ідеї':
      case 'Я талант':
        dispatch(setTypeUser(propValue === 'Я талант'))
        if (userProfile?.is_talent) {
          dispatch(
            setUserProfile({
              ...userProfile,
              is_talent: propValue === 'Я талант',
            })
          )
        }

        break
      default:
        break
    }
  }

  return (
    <div className="switch-toggle">
      <span
        className="switch-toggle__button"
        data-prop={prop1}
        style={changeActiveLanguage(prop1)}
        onClick={changeLang}
      >
        {prop1}
      </span>
      <span
        className="switch-toggle__button"
        style={changeActiveLanguage(prop2)}
        onClick={changeLang}
        data-prop={prop2}
      >
        {prop2}
      </span>
    </div>
  )
}

export default SwitchToggle
