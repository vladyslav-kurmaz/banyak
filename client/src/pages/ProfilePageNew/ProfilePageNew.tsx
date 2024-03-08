import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'
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
import AvatarName from '../../components/AvatarName/AvatarName'

import './ProfilePageNew.scss'
import { Link } from 'react-router-dom'

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
      <AvatarName userData={userInfo?.user} />
      <div className="profile-btn-group">
        <ButtonSmall
          text="Чат"
          icon={chat}
          style={{ width: '87px', boxSizing: 'border-box' }}
        />
        <ButtonSmall
          text="Мої ідеї"
          icon={lampIcon}
          style={{ width: '123px', boxSizing: 'border-box' }}
        />
        <ButtonSmall
          text="Додати ідею"
          icon={plusIcon}
          href="/create-idea"
          style={{ width: '166px', boxSizing: 'border-box' }}
        />
        <Link to={'/create-idea'} />
      </div>
    </div>
  )
}

export default ProfilePageNew
