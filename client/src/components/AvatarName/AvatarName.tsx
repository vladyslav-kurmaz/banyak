import logo from '../../image/logo/small_logo.webp'
import { UserPersonalData } from '../../types/types'
import './AvatarName.scss'

function AvatarName({ userData }: { userData: UserPersonalData | undefined }) {
  return (
    <div className="avatar-name">
      <div className="avatar-change-avatar">
        <img
          src={logo}
          className="avatar-change-avatar__avatar"
          alt="User avatar"
        />
        <div className="avatar-change-avatar__wrapper">
          <label
            htmlFor="change-avatar"
            className="avatar-change-avatar__wrapper-btn"
          >
            Замінити фото
            <input
              className="avatar-change-avatar__wrapper-input"
              type="file"
              id="change-avatar"
              accept=".jpg, .jpeg, .png"
              onChange={() => {}}
            />
          </label>
          <div className="avatar-change-avatar__wrapper-name">
            {userData?.first_name} {userData?.last_name}
          </div>
          <div className="avatar-change-avatar__wrapper-email">
            {userData?.email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarName
