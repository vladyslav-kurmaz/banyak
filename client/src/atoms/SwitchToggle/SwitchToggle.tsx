import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'
import {
  changeLanguage,
  changeStatusInstr,
  changeLoginOrSingUp,
} from '../../components/SettingMenu/StateElementSlice'
import { selectUserInfo, setTypeUser } from '../../store/userSlice'

import './SwitchToggle.scss'

type SwitchToggle = {
  prop1: string
  prop2: string
}

const SwitchToogle: FC<SwitchToggle> = ({ prop1, prop2 }) => {
  const dispatch = useAppDispatch()
  const { mainLanguage, statusInstr, loginOrSingUp } = useAppSelector(
    (state) => state.stateElement
  )
  const { typeUser } = useAppSelector(selectUserInfo)
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

    switch (prop1 || prop2) {
      case 'Власник ідеї' || 'Талант':
        dispatch(changeStatusInstr(target.getAttribute('data-prop')))
        break
      case 'УКР' || 'ENG':
        dispatch(changeLanguage(target.getAttribute('data-prop')))
        break
      case 'РЕЄСТРАЦІЯ' || 'ВХІД':
        dispatch(changeLoginOrSingUp(target.getAttribute('data-prop')))
        break
      case 'Я власник ідеї' || 'Я талант':
        target.getAttribute('data-prop') === 'Я власник ідеї'
          ? dispatch(setTypeUser(false))
          : dispatch(setTypeUser(true))

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

export default SwitchToogle
