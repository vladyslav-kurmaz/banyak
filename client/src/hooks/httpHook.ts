

const useHttp = () => {


  const request = async (
    url: string,
    {
      method,
      headers,
      body,
    }: {
      method: string;
      headers: HeadersInit | undefined;
      body: BodyInit | null | undefined;
    }
  ) => {
    const rec = await fetch(url, { method, headers, body });

    try {
      if (!rec.ok) {
        throw new Error('this fatch is bad, repeat later')
      }

      return await rec.json()
    } catch (e) {
      console.error(e)
    }
  };


  return  {
    request
  }
}

export default useHttp;