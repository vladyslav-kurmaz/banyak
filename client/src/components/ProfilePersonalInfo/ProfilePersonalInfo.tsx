import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkitHooks'
import SwitchToggle from '../../atoms/SwitchToggle/SwitchToggle'
import { selectUserInfo } from '../../store/userSlice'
import logo from '../../image/logo/small_logo.webp'

import './ProfilePersonalInfo.scss'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'

import chat from '../../image/header/chat.svg'
import lampIcon from '../../image/icon/idea.svg'
import plusIcon from '../../image/icon/PLUS.svg'
import { hostname } from '../../constants/URLs'
import Avatar from '../Avatar/Avatar'

const ProfilePersonalInfo = ({
  fc,
}: {
  fc: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [newAvatar, setNewAvatar] = useState<File | undefined>()
  const { userProfile } = useAppSelector(selectUserInfo)
  console.log('userProfile from profilePersonal info', userProfile)
  const avatarUrl = userProfile?.avatar?.avatar_profile
    ? `${hostname}${userProfile.avatar.avatar_profile}`
    : null

  console.log('avatarUrl', avatarUrl)

  const handleOnChangeFile = (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setNewAvatar(target.files[0])
  }

  const renderUserInfo = () => {
    if (!userProfile) {
      return null
    }

    const { user } = userProfile

    return (
      <div className="personal-info__wrapper">
        <Avatar
          newAvatar={newAvatar}
          avatarUrl={avatarUrl}
          logo={logo}
          handleOnChangeFile={handleOnChangeFile}
          setNewAvatar={setNewAvatar}
        />
        <span className="personal-info__name">
          {user.first_name} {user.last_name}
        </span>
        <span className="personal-info__email">{user.email}</span>
      </div>
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
