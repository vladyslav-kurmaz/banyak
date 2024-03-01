import logo from '../../image/logo/small_logo.webp'

function AvatarChangeAvatar() {
  return (
    <div className="avatar-change-avatar">
      <img src={logo} className="" alt="User avatar" />
      <label htmlFor="change-avatar" className="">
        Замінити фото
        <input
          className=""
          type="file"
          id="change-avatar"
          accept=".jpg, .jpeg, .png"
          onChange={() => {}}
        />
      </label>
    </div>
  )
}

export default AvatarChangeAvatar
