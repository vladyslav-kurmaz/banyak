// The sours: https://medium.com/@hawaiidevold/useget-post-react-custom-hook-44357335d5be
import { useCallback, useEffect, useState } from 'react'
import workWithCookies from '../utils/workWithCookies'

interface BaseProps {
  path: string
  start: boolean
}

type GetProps = {
  method: 'GET' | 'HEAD'
  data?: never
}

type PostProps = {
  method: 'POST' | 'DELETE' | 'PUT'
  data: object
}

type ConditionalProps = GetProps | PostProps

type Props = BaseProps & ConditionalProps

type FetchReturn = [
  data: object | undefined,
  loading: boolean,
  refresh: () => void,
  statusCode: number
]

function getUrl(relative: string) {
  // eslint-disable-next-line
  const urlExpression =
    'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
  const regex = new RegExp(urlExpression)

  if (relative.match(regex)) {
    return relative
  }

  var mainURL = process.env.REACT_APP_API_ENDPOINT
  if (mainURL === undefined) return ''
  if (mainURL.charAt(mainURL.length - 1) !== '/') mainURL += '/'

  if (relative.length > 0 && relative.charAt(0) === '/')
    relative = relative.substring(1, relative.length)

  return mainURL + relative
}

export function useFetch({ path, method, data, start }: Props): FetchReturn {
  const [result, setResult] = useState<object>()
  const [loading, setLoading] = useState(false)
  const [statusCode, setCode] = useState(-1)
  const { getCookies } = workWithCookies()
  const token = getCookies('sessiontokenid')
  const fetchData = useCallback(async () => {
    if (loading) {
      return
    }

    setLoading(true)

    const staticURL = getUrl(path)

    const response = await fetch(staticURL, {
      headers:
        data === undefined
          ? {}
          : {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
      body: JSON.stringify(data === undefined ? {} : data),
      method: method,
    })

    setCode(response.status)

    try {
      const text = await response.text()
      const data = JSON.parse(text)
      setResult(data)
    } catch (err) {
      setResult({})
    }

    setLoading(false)
  }, [data, loading, statusCode])

  useEffect(() => {
    if (start) {
      fetchData()
    }
  }, [fetchData, start])

  const refresh = () => {
    fetchData()
  }

  return [result, loading, refresh, statusCode]
}

export function useGet({ path, start }: BaseProps): FetchReturn {
  return useFetch({ path, method: 'GET', start })
}

export function usePost({
  path,
  start,
  data,
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: 'POST', start, data })
  return fetchResult
}
