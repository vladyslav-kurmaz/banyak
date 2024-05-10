export const _baseUlr = 'http://localhost:8000'

export const _baseUlrApi = 'https://banyak-api.onrender.com'

export const hostname =
  window.location.hostname === 'localhost' ? _baseUlr : _baseUlrApi

export const USER_PROFILE_URL = `${hostname}/api/v1/users/user-profile/`
export const USER_REGISTRATION_URL = `${hostname}/api/v1/users/register/`
export const USER_LOGIN_URL = `${hostname}/api/v1/users/login/`
export const USER_PROFILE_AVATAR = `${hostname}/api/v1/users/user-profile-avatar/`
export const IDEA_AVATAR = `${hostname}/api/v1/ideas/ideas/avatar-update/`
export const USER_LOGOUT_URL = `${hostname}/api/v1/users/logout/`
export const USER_NEW_ACCESS = `${hostname}/api/v1/users/new-access/`
export const IDEAS_URL = `${hostname}/api/v1/ideas/ideas/`
