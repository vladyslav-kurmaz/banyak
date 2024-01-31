import { useAppDispatch } from '../hooks/reduxToolkidHooks'
import useHttp from '../hooks/httpHook'

import { changeUserProfile } from '../store/userSlice'
import { changreMainPreloader } from '../components/SettingMenu/StateElementSlice'

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

  const singUpNewUser = (body: BodyInit | null | undefined) => {
    const req = request(`${hostname}/api/v1/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })
    console.log(req)
    return req
  }

  const loginUser = async (body: BodyInit | null | undefined) => {
    const req = await request(`${hostname}/api/v1/users/login/`, {
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
      const req = await request(`${hostname}/api/v1/users/user-profile/`, {
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
      dispatch(changeUserProfile(await reqJson))
      return await reqJson
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)

        if (e.status === 403) {
          newAccess()
        }
        dispatch(changreMainPreloader(false))
      }
      console.error(e)
    }
  }

  const updatPhoto = async (
    token: string,
    method: string,
    body?: BodyInit | null | undefined
  ) => {
    try {
      const req = await request(
        `${hostname}/api/v1/users/user-profile-avatar/`,
        {
          method: method,
          headers: { Authorization: `Bearer ${token}` },
          body: body,
        }
      )
      // const reqJson = await req.json()
      // dispatch(changeUserProfile(await reqJson))
      return await req.json()
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)
        if (e.status === 403) {
          newAccess()
        }
        dispatch(changreMainPreloader(false))
      }
      console.error(e)
    }
  }

  const exitUser = async () => {
    const tokensesion = getCookies('sessiontokenid')
    const tokenid = getCookies('tokenid')

    try {
      // eslint-disable-next-line
      const req = await request(`${hostname}/api/v1/users/logout/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokensesion}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: tokenid }),
      })

      dispatch(changeUserProfile(null))
      deleteCookie('sessiontokenid')
      deleteCookie('tokenid')
      // return req;
      dispatch(changreMainPreloader(false))
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status)

        if (e.status === 403) {
          newAccess()
        }
      }
      console.error(e)
      dispatch(changreMainPreloader(false))
    }
  }

  const newAccess = async () => {
    const tokenid = getCookies('tokenid')

    try {
      const req = await request(`${hostname}/api/v1/users/new-access/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application-json' },
        body: JSON.stringify({ refresh_token: tokenid }),
      })
      const newToken = await req.json()
      console.log('try')

      setCookies('sessiontokenid', await newToken.access_token, 1)

      dispatch(changreMainPreloader(false))
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        if (e.status === 403) {
          dispatch(changeUserProfile(null))
          deleteCookie('sessiontokenid')
          deleteCookie('tokenid')
        }
        console.log(e.status)
        dispatch(changreMainPreloader(false))
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

  // const getTalents = async () => {
  //   try {
  //     const req = await request(`${hostname}/api/v1/talents/talent/`, {})

  //     if (!req.ok) {
  //       return Promise.reject(req)
  //     }

  //     return Promise.resolve(req)
  //   } catch (e) {
  //     return Promise.reject(e)
  //   }
  // }

  const getTalents = async (
    filteredBySpecialty?: string,
    filteredByStack?: string
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
      }

      const response = await fetch(`${url}${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      return response.json() as Promise<ServerResForTalents>
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack)
        throw error
      } else {
        console.error('An unknown error occurred:', error)
      }

      return null
    }
  }

  // const getIdeas = async () => {
  //   try {
  //     const req = await request(`${hostname}/api/v1/ideas/ideas/`, {})

  //     if (!req.ok) {
  //       return Promise.reject(req)
  //     }

  //     return Promise.resolve(req)
  //   } catch (e) {
  //     return Promise.reject(e)
  //   }
  // }

  const getIdeas = async (
    filteredBySpecialty?: string,
    filteredByStack?: string
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
      }

      const response = await fetch(`${url}${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }
      return response.json() as Promise<ServerResForIdeas>
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack)
        throw error
      } else {
        console.error('An unknown error occurred:', error)
      }

      return null
    }
  }

  const getAllSpecialties = async () => {
    try {
      const response = await request(
        `${hostname}/api/v1/users/specilaity-list/`,
        {}
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }
      return response.json() as Promise<ServerResForAllSpecialtiesType>
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack)
        throw error
      } else {
        console.error('An unknown error occurred:', error)
      }

      return null
    }
  }

  return {
    singUpNewUser,
    loginUser,
    exitUser,
    profileUser,
    newAccess,
    getAllStack,
    getTalents,
    getIdeas,
    updatPhoto,
    getAllSpecialties,
  }
}

export default ServiceBanyak
