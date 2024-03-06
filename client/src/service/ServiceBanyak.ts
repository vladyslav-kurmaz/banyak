import { useAppDispatch } from '../hooks/reduxToolkitHooks'
import useHttp from '../hooks/httpHook'
import { setUserProfile } from '../store/userSlice'
import { changeMainPreloader } from '../components/SettingMenu/StateElementSlice'
import workWithCookies from '../utils/workWithCookies'
import {
  ServerResForAllSpecialtiesType,
  ServerResForIdeas,
  ServerResForTalents,
} from '../types/types'

const ServiceBanyak = () => {
  const dispatch = useAppDispatch()
  const { setCookies, getCookies, deleteCookie } = workWithCookies()
  const { request } = useHttp()

  const _baseUlr = 'http://localhost:8000'

  const _baseUlrApi = 'https://banyak-api.onrender.com'

  const hostname =
    window.location.hostname === 'localhost' ? _baseUlr : _baseUlrApi

  const USER_PROFILE_URL = `${hostname}/api/v1/users/user-profile/`
  const USER_REGISTRATION_URL = `${hostname}/api/v1/users/register/`
  const USER_LOGIN_URL = `${hostname}/api/v1/users/login/`
  const USER_PROFILE_AVATAR = `${hostname}/api/v1/users/user-profile-avatar/`
  const USER_LOGOUT_URL = `${hostname}/api/v1/users/logout/`
  const USER_NEW_ACCESS = `${hostname}/api/v1/users/new-access/`

  const handleError = (error: any) => {
    if (error instanceof Error) {
      console.error(error.stack)
      throw error
    } else {
      console.error('An unknown error occurred:', error)
    }

    return null
  }

  const singUpNewUser = async (body: BodyInit | null | undefined) => {
    return fetch(USER_REGISTRATION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
      .then((response) => {
        console.log('singUpNewUser resp', response.statusText)
        return response
      })
      .catch((error) => {
        handleError(error)
      })
  }

  const loginUser = async (body: BodyInit | null | undefined) => {
    const req = await request(USER_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })

    return req
  }

  const profileUser = async (
    token: string,
    method: string,
    body?: BodyInit | null | undefined
  ) => {
    try {
      const req = await request(USER_PROFILE_URL, {
        method: method,
        headers:
          typeof body === 'string'
            ? {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            : { Authorization: `Bearer ${token}` },
        body: body,
      })
      const reqJson = await req.json()
      dispatch(setUserProfile(await reqJson))
      return await reqJson
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)

        if (e.status === 403) {
          newAccess()
        }
        dispatch(changeMainPreloader(false))
      }
      console.error(e)
    }
  }

  const updatePhoto = async (
    token: string,
    method: string,
    body?: BodyInit | null | undefined
  ) => {
    try {
      const req = await request(USER_PROFILE_AVATAR, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: body,
      })
      // const reqJson = await req.json()
      // dispatch(setUserProfile(await reqJson))
      return await req.json()
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)
        if (e.status === 403) {
          newAccess()
        }
        dispatch(changeMainPreloader(false))
      }
      console.error(e)
    }
  }

  const exitUser = async () => {
    const tokensesion = getCookies('sessiontokenid')
    const tokenid = getCookies('tokenid')

    try {
      // eslint-disable-next-line
      const req = await request(USER_LOGOUT_URL, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokensesion}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: tokenid }),
      })

      dispatch(setUserProfile(null))
      deleteCookie('sessiontokenid')
      deleteCookie('tokenid')
      // return req;
      dispatch(changeMainPreloader(false))
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)

        if (e.status === 403) {
          newAccess()
        }
      }
      console.error(e)
      dispatch(changeMainPreloader(false))
    }
  }

  const newAccess = async () => {
    const tokenid = getCookies('tokenid')

    try {
      const req = await request(USER_NEW_ACCESS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application-json' },
        body: JSON.stringify({ refresh_token: tokenid }),
      })
      const newToken = await req.json()

      setCookies('sessiontokenid', await newToken.access_token, 1)

      dispatch(changeMainPreloader(false))
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        if (e.status === 403) {
          dispatch(setUserProfile(null))
          deleteCookie('sessiontokenid')
          deleteCookie('tokenid')
        }
        console.log(e.status)
        dispatch(changeMainPreloader(false))
      }
      console.error(e)
    }
  }

  const getAllStack = async (
    url: string,
    method: string,
    stack?: { id: string }
  ) => {
    const fetchSetting = stack
      ? {
          method: method,

          headers: { 'Content-Type': 'application-json' },
          body: JSON.stringify({ name: stack }),
        }
      : {}

    try {
      const req = await request(`${hostname}/api/v1/users/${url}`, fetchSetting)

      if (!req.ok) {
        return Promise.reject(req)
      }

      return req.json()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const getTalents = async (
    filteredBySpecialty?: string,
    filteredByStack?: string,
    currentPage?: number
  ) => {
    try {
      // const response = filteredBySpecialty
      //   ? await fetch(
      //       `${hostname}/api/v1/talents/talent/talents-filter?${new URLSearchParams(
      //         {
      //           speciality: filteredBySpecialty,
      //         }
      //       )}`
      //     )
      //   : await request(`${hostname}/api/v1/talents/talent/`, {})
      const baseUrl = `${hostname}/api/v1/talents/talent/`
      const params = new URLSearchParams()
      let url = `${hostname}/api/v1/talents/talent/`

      if (filteredBySpecialty) {
        url = `${baseUrl}talents-filter?`
        params.set('speciality', filteredBySpecialty)
      } else if (filteredByStack) {
        url = `${baseUrl}search?`
        params.set('search', filteredByStack)
      } else if (currentPage) {
        url = `${baseUrl}?`
        params.set('page_size', `${currentPage}`)
      }

      const response = await fetch(`${url}${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      return response.json() as Promise<ServerResForTalents>
    } catch (error) {
      handleError(error)
    }
  }

  const getIdeas = async (
    filteredBySpecialty?: string,
    filteredByStack?: string,
    currentPage?: number
  ) => {
    try {
      // const response = filteredBySpecialty
      //   ? await fetch(
      //       `${hostname}/api/v1/ideas/ideas/ideas-filter?${new URLSearchParams({
      //         speciality: filteredBySpecialty,
      //       })}`
      //     )
      //   : await request(`${hostname}/api/v1/ideas/ideas/`, {})
      const baseUrl = `${hostname}/api/v1/ideas/ideas/`
      const params = new URLSearchParams()
      let url = `${hostname}/api/v1/ideas/ideas/`

      if (filteredBySpecialty) {
        url = `${baseUrl}ideas-filter?`
        params.set('speciality', filteredBySpecialty)
      } else if (filteredByStack) {
        url = `${baseUrl}search?`
        params.set('search', filteredByStack)
      } else if (currentPage) {
        url = `${baseUrl}?`
        params.set('page_size', `${currentPage}`)
      }

      const response = await fetch(`${url}${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }
      return response.json() as Promise<ServerResForIdeas>
    } catch (error) {
      handleError(error)
    }
  }

  const getAllSpecialties = async () => {
    try {
      const response = await request(
        `${hostname}/api/v1/users/specilaity-list/`, //!!!!!!!!specilaity change typo on backend
        {}
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }
      return response.json() as Promise<ServerResForAllSpecialtiesType>
    } catch (error) {
      handleError(error)
    }
  }

  const updateUserProfile = async (
    token: string,
    body?: BodyInit | null | undefined
  ) => {
    try {
      const response = await fetch(USER_PROFILE_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      console.log('updateUserProfile response', response)
      return response.json()
    } catch (error) {
      handleError(error)
    }
  }

  return {
    hostname,
    handleError,
    singUpNewUser,
    updateUserProfile,
    loginUser,
    exitUser,
    profileUser,
    newAccess,
    getAllStack,
    getTalents,
    getIdeas,
    updatePhoto,
    getAllSpecialties,
  }
}

export default ServiceBanyak
