import { useAppDispatch } from '../../hooks/reduxToolkidHooks'
import { useNavigate } from 'react-router-dom'

import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'

import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'

import './ButtonChooseProfile.scss'

const ButtonChooseProfile = ({
  text,
  isTalent,
}: {
  text: string
  isTalent: boolean
}) => {
  const { updateUserProfile, handleError } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const chooseProfile = async () => {
    const token = getCookies('sessiontokenid')

    if (token) {
      try {
        // eslint-disable-next-line
        const putUserType = await updateUserProfile(
          token,
          JSON.stringify({ is_talent: isTalent })
        )

        console.log('patchUserType', putUserType)
        navigate('/') //make navigation to user profile
        dispatch(changreMainPreloader(false))
      } catch (e) {
        handleError(e)
      }
    }
  }

  return (
    <button
      className="button-chose-profile"
      data-type={isTalent}
      onClick={chooseProfile}
    >
      {text}
    </button>
  )
}

export default ButtonChooseProfile
