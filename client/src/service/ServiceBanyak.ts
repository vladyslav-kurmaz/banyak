import { useAppDispatch } from "../hooks/reduxToolkidHooks";
import useHttp from "../hooks/httpHook";

import { changeUserProfile } from "../store/userSlice";
import { changreMainPreloader } from "../components/SettingMenu/StateElementSlice";

import workWithCookies from "../untils/workWithCookies";

const ServiceBanyak = () => {
  const dispatch = useAppDispatch();
  const { setCookies, getCookies, deleteCookie } = workWithCookies();
  const {request} = useHttp();

  

  const _baseUlr = "http://localhost:8000";
  // const _baseUlr = 'https://banyak-api.onrender.com'

  const singUpNewUser = (body: BodyInit | null | undefined) => {
    const req = request(`${_baseUlr}/api/v1/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    console.log(req);
    

    return req;
  };

  const loginUser = async (body: BodyInit | null | undefined) => {
    const req = await request(`${_baseUlr}/api/v1/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    return req;
  };

  const profileUser = async (
    token: string,
    method: string,
    body?: BodyInit | null | undefined
  ) => {

    try {
      const req = await request(`${_baseUlr}/api/v1/users/user-profile/`, {
        method: method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: body,
      });
      const reqJson = await req.json()
      dispatch(changeUserProfile(await reqJson))
      return await reqJson;
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status);
        if (e.status === 403) {
          newAccess()
        }
        dispatch(changreMainPreloader(false));
      }
      console.error(e);
    }    
  };

  const exitUser = async () => {
    const tokensesion = getCookies('sessiontokenid');
    const tokenid = getCookies('tokenid');
    
    try {
      const req = await request(`${_baseUlr}/api/v1/users/logout/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokensesion}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({refresh_token: tokenid}),
      });
      // console.log(req);
      // console.log(await req.json());
      
      

      
      dispatch(changeUserProfile(null));
      deleteCookie('sessiontokenid');
      deleteCookie('tokenid');
      // return req;
      dispatch(changreMainPreloader(false));
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        console.log(e.status);
        if (e.status === 403) {
          newAccess()
        }
        
      }
      console.error(e);
      dispatch(changreMainPreloader(false));
    }
  };


  // const exitUser = (token: string, body?: BodyInit) => {
  //   const token = getCookies('sessiontokenid')
  //   const req = request(`${_baseUlr}/api/v1/users/logout/`, {
  //     method: "DELETE",
  //     headers: { authorization: `Token ${token}` },
  //     body: ,
  //   });

  //   try {
  //     dispatch(changeUserProfile(null));
  //     deleteCookie('sessiontokenid');
  //     deleteCookie('tokenid');
  //     return req;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  

  const newAccess = async () => {
    const tokensesion = getCookies('sessiontokenid')
    const tokenid = getCookies('tokenid')
    
    try {
      const req = await request(`${_baseUlr}/api/v1/users/new-access/`, {
        method: "PUT",
        headers: {'Content-Type': 'application-json' },
        body: JSON.stringify({refresh_token: tokenid}),
      });
      const newToken = await req.json()
      console.log('try');
      
      setCookies('sessiontokenid', await newToken.access_token, 1)
      // dispatch(changeUserProfile(null));
      // deleteCookie('sessiontokenid');
      // deleteCookie('tokenid');
      // return req;
      dispatch(changreMainPreloader(false));
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'status' in e) {
        if (e.status === 403) {
          dispatch(changeUserProfile(null));
          deleteCookie('sessiontokenid');
          deleteCookie('tokenid');
        }
        console.log(e.status);
        dispatch(changreMainPreloader(false));
      }
      console.error(e);
    }
  };


  return {
    singUpNewUser,
    loginUser,
    exitUser,
    profileUser,
    newAccess
  };
};

export default ServiceBanyak;
