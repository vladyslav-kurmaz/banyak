import { useAppDispatch } from "../hooks/reduxToolkidHooks";
import useHttp from "../hooks/httpHook";

import { changeActiveId } from "../store/userSlice";

import workWithCookies from "../untils/workWithCookies";

const ServiceBanyak = () => {
  const dispatch = useAppDispatch();
  const { setCookies, getCookies, deleteCookie } = workWithCookies();
  const {request} = useHttp();

  

  const _baseUlr = "http://localhost:8000";

  const singUpNewUser = (body: BodyInit | null | undefined) => {
    const req = request(`${_baseUlr}/api/v1/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    return req;
  };

  const loginUser = async (body: BodyInit | null | undefined) => {
    const req = await request(`${_baseUlr}/api/v1/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    try {
      if (typeof req === "object") {
        setCookies("_id", req.token, 30);
        setCookies("test", "sdfsdfsfsffsd", 30);
      }
      return req;
    } catch (e) {console.log(e);
    }
  };

  const exitUser = (token: string) => {
    const req = request(`${_baseUlr}/api/v1/users/logout/`, {
      method: "DELETE",
      headers: { authorization: `Token ${token}` },
      body: null,
    });

    try {
      dispatch(changeActiveId(null));
      return req;
    } catch (e) {
      console.error(e);
    }
  };

  const profileUser = (
    token: string,
    method: string,
    body?: BodyInit | null | undefined
  ) => {
    const req = request(`${_baseUlr}/api/v1/users/login/`, {
      method: method,
      headers: { authorization: `Token ${token}` },
      body: body,
    });
    return req;
  };

  return {
    singUpNewUser,
    loginUser,
    exitUser,
    profileUser,
  };
};

export default ServiceBanyak;
