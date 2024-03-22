import { FC } from 'react'
import { useAppDispatch } from '../../hooks/reduxToolkitHooks'
import { useNavigate } from 'react-router-dom'
import { changeMainPreloader } from '../../store/stateElementSlice'
import { setTypeUser } from '../../store/userSlice'
import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'

import './ButtonChooseProfile.scss'

type ButtonChooseProfilePropsType = {
  text: string
  isTalent: boolean
}

const ButtonChooseProfile: FC<ButtonChooseProfilePropsType> = ({
  text,
  isTalent,
}) => {
  const { updateUserProfile, handleError } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const chooseProfile = async () => {
    const token = getCookies('sessiontokenid')
    if (token) {
      try {
        await updateUserProfile(token, JSON.stringify({ is_talent: isTalent }))
        navigate('/profile')
        dispatch(setTypeUser(isTalent))
        dispatch(changeMainPreloader(false))
      } catch (e) {
        handleError(e)
      }
    }
  }

  return (
    <button
      type="button"
      className="button-chose-profile"
      data-type={isTalent}
      onClick={chooseProfile}
    >
      {text}
    </button>
  )
}

export default ButtonChooseProfile
