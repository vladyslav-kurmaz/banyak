import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'

import ProfilePersonalInfo from '../../components/ProfilePersonalInfo/ProfilePersonalInfo'
import ProfileStackInfo from '../../components/ProfileStackInfo/ProfileStackInfo'

import './ProfilePage.scss'
import { TprofileChange } from '../../types/types'
import { selectUserInfo, setTypeUser } from '../../store/userSlice'
import workWithCookies from '../../utils/workWithCookies'
import ServiceBanyak from '../../service/ServiceBanyak'

const ProfilePage = ({
  fc,
}: {
  fc: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { hostname } = ServiceBanyak()
  const { getCookies } = workWithCookies()
  const token = getCookies('sessiontokenid')
  const { userProfile, typeUser } = useAppSelector(selectUserInfo)
  const [disabled, setDisabled] = useState(false)
  const dispatch = useAppDispatch()

  const [newUserData, setNewUserData] = useState<TprofileChange | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${hostname}/api/v1/users/user-profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const user = await response.json()
      console.log('user ProfilePage', user)
    }
    fetchProfile()
  }, []) //make request to server to get userData

  useEffect(() => {
    if (
      newUserData?.description !== userProfile?.description ||
      newUserData?.is_talent !== userProfile?.is_talent ||
      newUserData?.portfolio !== userProfile?.portfolio ||
      newUserData?.speciality !== userProfile?.speciality ||
      newUserData?.stack !== userProfile?.stack
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    // eslint-disable-next-line
  }, [newUserData])

  useEffect(() => {
    if (newUserData) {
      setNewUserData((state) =>
        state && state !== undefined ? { ...state, is_talent: typeUser } : null
      )
    }
    // eslint-disable-next-line
  }, [typeUser])

  useEffect(() => {
    if (userProfile) {
      setNewUserData({
        speciality:
          userProfile?.speciality && userProfile?.speciality.length === 0
            ? []
            : userProfile?.speciality,
        stack: userProfile?.stack,
        // avatar: userProfile?.avatar,
        description:
          userProfile.description === null ? '' : userProfile.description,
        is_talent: userProfile.is_talent,
        // is_military: userProfile.is_military,
        // is_vpo: userProfile.is_vpo,
        // ideas: userProfile.ideas,
        portfolio: userProfile.portfolio === null ? '' : userProfile.portfolio,
      })

      dispatch(setTypeUser(userProfile.is_talent))
    }
    // eslint-disable-next-line
  }, [userProfile])

  return (
    <div className="profile profile__inside profile__outside">
      {userProfile !== null && newUserData !== null && (
        <>
          <ProfilePersonalInfo fc={fc} />
          <ProfileStackInfo
            disabled={disabled}
            userProfil={userProfile}
            fnState={setNewUserData}
            newUserProfile={newUserData}
          />
        </>
      )}
    </div>
  )
}

export default ProfilePage
