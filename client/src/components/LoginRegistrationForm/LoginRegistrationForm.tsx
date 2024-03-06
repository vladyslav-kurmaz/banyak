import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// work with redux
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'

import {
  changeCounterLink,
  changeLoginOrSingUp,
  changeMainPreloader,
  changeErrorStatus,
} from '../SettingMenu/StateElementSlice'
import { setUserProfile } from '../../store/userSlice'

// Services
import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'

// Components
import CustomInput from '../../atoms/CustomInput/CustomInput'
import SwitchToggle from '../../atoms/SwitchToggle/SwitchToggle'
import CrossCustom from '../../atoms/CrossCustom/CrossCustom'

// photo
import logo from '../../image/logo/LOGO_Banyak.webp'

import './LoginRegistrationForm.scss'

// utils
import validationForm from '../../utils/validationForm'
import translateErrorStatus from '../../utils/translateErroStatus'

const LoginRegistrationForm = () => {
  const [name, setName] = useState('')
  const [surName, setSurName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [modalLocation, setModalLocation] = useState<string[]>([])
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { setCookies, deleteCookie } = workWithCookies()

  const { singUpNewUser, loginUser, profileUser } = ServiceBanyak()

  const { loginOrSingUp, errorStatus } = useAppSelector(
    (state) => state.stateElement
  )

  useEffect(() => {
    if (loginOrSingUp === 'ВХІД') {
      setName('')
      setSurName('')
      setEmail('')
      setPass('')
      dispatch(changeCounterLink())
      navigate('?login')

      setModalLocation((state) => [...state, '?login'])
    } else {
      setName('')
      setSurName('')
      setEmail('')
      setPass('')
      dispatch(changeCounterLink())
      navigate('?singup')

      setModalLocation((state) => [...state, '?singup'])
    }
    // eslint-disable-next-line
  }, [loginOrSingUp])

  useEffect(() => {
    if (location.search === '?login') {
      dispatch(changeLoginOrSingUp('ВХІД'))
      setDisabled(true)
    } else if (location.search === '?singup') {
      dispatch(changeLoginOrSingUp('РЕЄСТРАЦІЯ'))
      setDisabled(true)
    }
    // eslint-disable-next-line
  }, [location.search])

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: (value: React.SetStateAction<string>) => void
  ) => {
    const value = e.target.value.trim()
    setState(value)
    dispatch(changeErrorStatus(null))
    // eslint-disable-next-line
  }

  useEffect(() => {
    const nameValid = validationForm(name, 'name')?.errorStatus
    const surNameValid = validationForm(surName, 'surname')?.errorStatus
    const emailValid = validationForm(email, 'email')?.errorStatus
    const passValid = validationForm(pass, 'pass')?.errorStatus

    if (location.search === '?login') {
      if (!emailValid && !passValid) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      if (!nameValid && !surNameValid && !emailValid && !passValid) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    // eslint-disable-next-line
  }, [name, surName, email, pass])

  const closeLoginForm = () => {
    document.body.style.overflow = ''

    modalLocation.forEach((loc) => {
      navigate(location.pathname, { replace: true })
    })

    navigate(location.pathname)
    setModalLocation([])
  }

  const submitSingUpForm = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(changeErrorStatus(null))

    const newUserData = {
      first_name: name,
      last_name: surName,
      email: email,
      password: pass,
    }
    // document.body.style.overflow = "";

    try {
      const registrationResponse = await singUpNewUser(
        JSON.stringify(newUserData)
      )

      const login = await loginUser(
        JSON.stringify({ email: email, password: pass })
      )
      const loginJson = await login.json()
      setCookies('sessiontokenid', await loginJson.access_token, 1)
      setCookies('tokenid', await loginJson.refresh_token, 1)

      const createProfile = await profileUser(loginJson.access_token, 'POST')
      dispatch(setUserProfile(await createProfile))

      navigate('/chose-profile')
      dispatch(changeMainPreloader(false))
      document.body.style.overflow = ''

      setName('')
      setSurName('')
      setEmail('')
      setPass('')
    } catch (e) {
      dispatch(changeMainPreloader(false))
      if (typeof e === 'object' && e !== null && 'status' in e) {
        dispatch(changeErrorStatus(e.status))
      }

      setName('')
      setSurName('')
      setEmail('')
      setPass('')
      console.error(e)
    }
  }

  const submitLoginUser = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(changeErrorStatus(null))

    const userData = {
      email: email,
      password: pass,
    }

    try {
      const login = await loginUser(JSON.stringify(userData))
      const loginJson = await login.json()
      setCookies('sessiontokenid', await loginJson.access_token, 1)
      setCookies('tokenid', await loginJson.refresh_token, 1)

      const createProfile = await profileUser(loginJson.access_token, 'GET')

      dispatch(setUserProfile(await createProfile))
      document.body.style.overflow = ''
      navigate('/')
      dispatch(changeMainPreloader(false))

      setEmail('')
      setPass('')
    } catch (e) {
      // document.body.style.overflow = "";
      dispatch(changeMainPreloader(false))
      if (typeof e === 'object' && e !== null && 'status' in e) {
        dispatch(changeErrorStatus(e.status))
      }
      setEmail('')
      setPass('')
      console.error(e)
    }
  }

  const renderForm = () => {
    if (loginOrSingUp === 'РЕЄСТРАЦІЯ') {
      return (
        <form
          className="registration__popup-form sing-up"
          onSubmit={(e) => submitSingUpForm(e)}
        >
          <CustomInput
            value={name}
            name="name"
            handler={(e) => changeValue(e, setName)}
            type="text"
            label={'Ім’я'}
            id="form__name"
          />
          <CustomInput
            value={surName}
            handler={(e) => changeValue(e, setSurName)}
            type="text"
            label={'Прізвище'}
            id="form__surname"
            name="surname"
          />
          <CustomInput
            value={email}
            handler={(e) => changeValue(e, setEmail)}
            type="text"
            label={'Електронна пошта'}
            id="form__email"
            name="email"
          />
          <CustomInput
            value={pass}
            handler={(e) => changeValue(e, setPass)}
            type="password"
            label={'Пароль'}
            id="form__pass"
            name="pass"
          />

          <p className="form__error">
            {errorStatus === null ? null : translateErrorStatus(errorStatus)}
          </p>

          <button disabled={disabled} className="registration__button ">
            Зареєструватись
          </button>
        </form>
      )
    } else {
      return (
        <form
          className="registration__popup-form login"
          onSubmit={(e) => submitLoginUser(e)}
        >
          <CustomInput
            value={email}
            handler={(e) => changeValue(e, setEmail)}
            type="text"
            label={'Електронна пошта'}
            id="form__email-login"
            name="email"
          />
          <CustomInput
            value={pass}
            handler={(e) => changeValue(e, setPass)}
            type="password"
            label={'Пароль'}
            id="form__pass-login"
            name="pass"
          />

          <p className="form__error">
            {errorStatus === null ? null : translateErrorStatus(errorStatus)}
          </p>

          <button disabled={disabled} className="registration__button ">
            Увійти
          </button>
          <div className="registration__popup-form-forgot">
            <a href="?login" className="registration__popup-form-forgot-pass">
              Забули пароль?
            </a>
          </div>
        </form>
      )
    }
  }

  // eslint-disable-next-line

  return (
    <div
      className="registration"
      // onClick={closeLoginForm}
    >
      <div className="registration__popup">
        <div className="registration__popup-logo">
          <img
            src={logo}
            alt="Banyk logo"
            className="registration__popup-logo-picture"
          />
          <CrossCustom
            style={{ top: '4px', right: '-84px' }}
            close={closeLoginForm}
          />
        </div>
        <div className="registration__popup-toggle">
          <SwitchToggle prop1={'РЕЄСТРАЦІЯ'} prop2={'ВХІД'} />
        </div>
        {renderForm()}
        <div className="registration__popup-another">
          <h3 className="registration__popup-another-title">
            Або авторизуйтесь через:
          </h3>
          <ul className="registration__popup-another-list">
            <li className="registration__popup-another-list-item google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <g clipPath="url(#clip0_172_9490)">
                  <mask
                    id="mask0_172_9490"
                    style={{ maskType: 'luminance' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="41"
                    height="40"
                  >
                    <path d="M0.5 0H40.5V40H0.5V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_172_9490)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.5 0C9.45333 0 0.5 8.955 0.5 20C0.5 31.045 9.45333 40 20.5 40C31.545 40 40.5 31.045 40.5 20C40.5 8.955 31.545 0 20.5 0ZM20.7333 31.6967C14.2867 31.6967 9.06667 26.4633 9.06667 20C9.06667 13.5367 14.2867 8.30333 20.7333 8.30333C23.8833 8.30333 26.5167 9.465 28.5367 11.3517L25.2467 14.6483V14.6417C24.0217 13.4717 22.4683 12.8717 20.7333 12.8717C16.8833 12.8717 13.755 16.1317 13.755 19.9933C13.755 23.8517 16.8833 27.1217 20.7333 27.1217C24.2267 27.1217 26.6033 25.1183 27.0933 22.3683H20.7333V17.8067H31.7083C31.855 18.59 31.9333 19.4067 31.9333 20.2633C31.9333 26.9467 27.4717 31.6967 20.7333 31.6967Z"
                      fill="#061730"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_172_9490">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="registration__popup-another-list-item-title">
                Google
              </span>
            </li>
            <li className="registration__popup-another-list-item  github">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <g clipPath="url(#clip0_172_9499)">
                  <path
                    d="M20.5 0C17.8736 0 15.2728 0.530159 12.8463 1.56021C10.4198 2.59025 8.21504 4.10002 6.35786 6.0033C2.60714 9.84714 0.5 15.0605 0.5 20.4965C0.5 29.556 6.24 37.2422 14.18 39.9683C15.18 40.1322 15.5 39.4968 15.5 38.9434V35.4795C9.96 36.7093 8.78 32.733 8.78 32.733C7.86 30.3554 6.56 29.72 6.56 29.72C4.74 28.4492 6.7 28.4902 6.7 28.4902C8.7 28.6337 9.76 30.6013 9.76 30.6013C11.5 33.7168 14.44 32.7945 15.58 32.3025C15.76 30.9703 16.28 30.0684 16.84 29.556C12.4 29.0436 7.74 27.2809 7.74 19.4717C7.74 17.1966 8.5 15.3724 9.8 13.9172C9.6 13.4047 8.9 11.2731 10 8.50606C10 8.50606 11.68 7.95266 15.5 10.5967C17.08 10.1458 18.8 9.92033 20.5 9.92033C22.2 9.92033 23.92 10.1458 25.5 10.5967C29.32 7.95266 31 8.50606 31 8.50606C32.1 11.2731 31.4 13.4047 31.2 13.9172C32.5 15.3724 33.26 17.1966 33.26 19.4717C33.26 27.3014 28.58 29.0231 24.12 29.5355C24.84 30.1709 25.5 31.4212 25.5 33.3274V38.9434C25.5 39.4968 25.82 40.1527 26.84 39.9683C34.78 37.2217 40.5 29.556 40.5 20.4965C40.5 17.8049 39.9827 15.1396 38.9776 12.6529C37.9725 10.1661 36.4993 7.90658 34.6421 6.0033C32.785 4.10002 30.5802 2.59025 28.1537 1.56021C25.7272 0.530159 23.1264 0 20.5 0Z"
                    fill="#061730"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_172_9499">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="registration__popup-another-list-item-title">
                GitHub
              </span>
            </li>
            <li className="registration__popup-another-list-item linkedin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_172_9503)">
                  <path
                    d="M20.0002 0C8.95437 0 0.000198364 8.95417 0.000198364 20C0.000198364 31.0458 8.95437 40 20.0002 40C31.046 40 40.0002 31.0458 40.0002 20C40.0002 8.95417 31.046 0 20.0002 0ZM15.1044 28.2896H11.0544V15.2562H15.1044V28.2896ZM13.0544 13.6562C11.7752 13.6562 10.9481 12.75 10.9481 11.6292C10.9481 10.4854 11.8002 9.60625 13.1064 9.60625C14.4127 9.60625 15.2127 10.4854 15.2377 11.6292C15.2377 12.75 14.4127 13.6562 13.0544 13.6562ZM29.896 28.2896H25.846V21.0667C25.846 19.3854 25.2585 18.2437 23.7939 18.2437C22.6752 18.2437 22.0106 19.0167 21.7169 19.7604C21.6085 20.025 21.5814 20.4 21.5814 20.7729V28.2875H17.5294V19.4125C17.5294 17.7854 17.4773 16.425 17.4231 15.2542H20.9419L21.1273 17.0646H21.2085C21.7419 16.2146 23.0481 14.9604 25.2335 14.9604C27.8981 14.9604 29.896 16.7458 29.896 20.5833V28.2896Z"
                    fill="#061730"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_172_9503">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="registration__popup-another-list-item-title">
                Linkedin
              </span>
            </li>
          </ul>
        </div>
        <div className="registration__popup-question">
          {loginOrSingUp === 'ВХІД' ? 'Ще намає акаунта?' : 'Вже є аккаунт?'}
          {loginOrSingUp === 'ВХІД' ? (
            <a href="?singup">Зареєструйтесь</a>
          ) : (
            <a href="?login">Увійдіть</a>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginRegistrationForm
