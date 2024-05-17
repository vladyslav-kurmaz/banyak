import { useState, useEffect, FC } from 'react'

type UseApiDataProps = {
  apiUrl: RequestInfo | URL
}

const useApiData = ({ apiUrl }: UseApiDataProps) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        setData(result)
      } catch (error: any) {
        if (error instanceof Error) setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])
  return { data, loading, error }
}

export default useApiData
