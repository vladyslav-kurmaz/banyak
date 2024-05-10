import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkitHooks'
import SwitchToggle from '../../atoms/SwitchToggle/SwitchToggle'
import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'
import { changeMainPreloader } from '../../store/stateElementSlice'
import { selectUserInfo, setUserProfileAvatar } from '../../store/userSlice'
import logo from '../../image/logo/small_logo.webp'

import './ProfilePersonalInfo.scss'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'

import chat from '../../image/header/chat.svg'
import lampIcon from '../../image/icon/idea.svg'
import plusIcon from '../../image/icon/PLUS.svg'
import { USER_PROFILE_AVATAR, hostname } from '../../constants/URLs'

const ProfilePersonalInfo = ({
  fc,
}: {
  fc: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()
  const [newAvatar, setNewAvatar] = useState<File | undefined>()
  const { getCookies } = workWithCookies()
  const { userProfile } = useAppSelector(selectUserInfo)
  console.log('userProfile from profilePersonal info', userProfile)
  const avatarUrl = userProfile?.avatar?.avatar_profile
    ? `${hostname}${userProfile.avatar.avatar_profile}`
    : null

  const handleOnChangeFile = (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setNewAvatar(target.files[0])
  }

  const sendNewAvatar = async () => {
    if (typeof newAvatar === 'undefined') return
    dispatch(changeMainPreloader(true))
    const token = getCookies('sessiontokenid')
    const formData = new FormData()
    formData.append('avatar_profile', newAvatar)
    // formData.append('upload_preset', 'test')

    console.log('formData', formData.getAll('avatar_profile'))
    try {
      const response = await fetch(USER_PROFILE_AVATAR, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()
      dispatch(setUserProfileAvatar(result))
      setNewAvatar(undefined)
      dispatch(changeMainPreloader(false))
    } catch (error) {
      console.log(error)
    }
  }

  const renderUserInfo = () => {
    if (!userProfile) {
      return null
    }

    const { user } = userProfile
    const newAvatarBlob = newAvatar as File
    const imageUrl = newAvatarBlob ? URL.createObjectURL(newAvatarBlob) : ''

    return (
      <>
        <img
          src={imageUrl || avatarUrl || logo}
          className="personal-info__avatar"
          alt="User avatar"
        />
        <div className="personal-info__container">
          {typeof newAvatar === 'undefined' ? (
            <label
              htmlFor="avatar-change"
              className="personal-info__changed-avatar"
            >
              Замінити фото
              <input
                className="personal-info__input"
                accept="image/*"
                type="file"
                id="avatar-change"
                onChange={(e) => handleOnChangeFile(e, 'avatar')}
              />
            </label>
          ) : (
            <div className="personal-info__update">
              <h2 className="personal-info__question">
                Ви бажаєте змінити фото?
              </h2>
              <ul className="personal-info__list">
                <li className="personal-info__button">
                  <ButtonSmall
                    btnType="button"
                    text="Так"
                    fn={() => sendNewAvatar()}
                  ></ButtonSmall>
                </li>
                <li className="personal-info__button">
                  <ButtonSmall
                    btnType="button"
                    text="Ні"
                    fn={() => setNewAvatar(undefined)}
                  ></ButtonSmall>
                </li>
              </ul>
            </div>
          )}

          <span className="personal-info__name">
            {user.first_name} {user.last_name}
          </span>
          <span className="personal-info__email">{user.email}</span>
        </div>
      </>
    )
  }

  return (
    <div className="personal-info">
      <div className="personal-info__user-profile">
        <SwitchToggle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      <div className="personal-info__main-info">
        {renderUserInfo()}

        <div className="personal-info__buttons">
          <div className="personal-info__button-outside personal-info__chat">
            <ButtonSmall text="Чат" icon={chat} />
          </div>

          <div className="personal-info__button-outside personal-info__my-idea">
            <ButtonSmall text="Мої ідеї" fn={() => fc(true)} icon={lampIcon} />
          </div>
          <div className="personal-info__button-outside personal-info__add-idea">
            <ButtonSmall
              text="Додати ідею"
              icon={plusIcon}
              href="/create-idea"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePersonalInfo
