import { FC } from 'react'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import { useAppDispatch } from '../../hooks/reduxToolkitHooks'
import { changeMainPreloader } from '../../store/stateElementSlice'
import workWithCookies from '../../utils/workWithCookies'
import { USER_PROFILE_AVATAR } from '../../constants/URLs'
import { setUserProfileAvatar } from '../../store/userSlice'

type AvatarPropsType = {
  newAvatar: File | undefined
  avatarUrl: string | null
  logo: string
  handleOnChangeFile: (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ) => void
  setNewAvatar: (value: React.SetStateAction<File | undefined>) => void
}

const Avatar: FC<AvatarPropsType> = ({
  newAvatar,
  avatarUrl,
  logo,
  handleOnChangeFile,
  setNewAvatar,
}) => {
  const { getCookies } = workWithCookies()
  const dispatch = useAppDispatch()
  const newAvatarBlob = newAvatar as File
  const imageUrl = newAvatarBlob ? URL.createObjectURL(newAvatarBlob) : ''

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
      </div>
    </>
  )
}

export default Avatar
