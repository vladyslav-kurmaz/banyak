import { useAppDispatch } from "../hooks/reduxToolkidHooks";
import { changreMainPreloader } from "../components/SettingMenu/StateElementSlice";


const useHttp = () => {
  const dispatch = useAppDispatch();

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
    dispatch(changreMainPreloader(true));

    try {
      const req = await fetch(url, { method, headers, body });
      if (!req.ok) {
        
        return Promise.reject(req);
      }
      
      return await Promise.resolve(req);
    } catch (e) {
      return Promise.reject(e);
    }
  };



  return  {
    request
  }
}

export default useHttp;