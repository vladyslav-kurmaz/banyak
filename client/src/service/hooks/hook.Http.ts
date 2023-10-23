

const hookHttp = () => {
  const request = async (
    url: string,
    {
      method,
      headers,
      body,
    }: {
      method?: string;
      headers?: HeadersInit | undefined;
      body?: BodyInit | null | undefined;
    }
  ) => {
    const req = await fetch(url, { method, headers, body });

    try {
      if (!req.ok) {
        throw new Error(`the new error after fetch in singUp ${req.status}`);
      }

      return await req.json();
    } catch (e) {
      console.error(e);
      throw new Error("New Error ");
    }
  };

  return {
    request
  }
}

export default hookHttp;