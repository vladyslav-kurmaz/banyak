import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'
import ProfilePersonalInfo from '../../components/ProfilePersonalInfo/ProfilePersonalInfo'
import ProfileStackInfo from '../../components/ProfileStackInfo/ProfileStackInfo'
import { TprofileChange, UserInfoType } from '../../types/types'
import { selectUserInfo, setTypeUser } from '../../store/userSlice'
import workWithCookies from '../../utils/workWithCookies'
import ServiceBanyak from '../../service/ServiceBanyak'
import chat from '../../image/header/chat.svg'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import lampIcon from '../../image/icon/idea.svg'
import plusIcon from '../../image/icon/PLUS.svg'

import './ProfilePageNew.scss'
import AvatarChangeAvatar from '../../components/AvatarChangeAvatar/AvatarChangeAvatar'

function ProfilePageNew() {
  const { hostname, handleError } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const token = getCookies('sessiontokenid')
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${hostname}/api/v1/users/user-profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const user = await response.json()
        setUserInfo(user)
        console.log(user)
      } catch (error) {
        handleError(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div>
      <AvatarChangeAvatar />

      <div className="">
        {userInfo?.user?.first_name} {userInfo?.user?.last_name}
      </div>
      <div className="">{userInfo?.user?.email}</div>
      <ButtonSmall text="Чат" icon={chat} />
      <ButtonSmall text="Мої ідеї" icon={lampIcon} />
      <ButtonSmall text="Додати ідею" icon={plusIcon} href="/create-idea" />
    </div>
  )
}

export default ProfilePageNew
