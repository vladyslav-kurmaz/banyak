import { MouseEvent } from "react";
import { useAppDispatch } from "../../hooks/reduxToolkidHooks";
import { useNavigate } from "react-router-dom";

import { changreMainPreloader } from "../../components/SettingMenu/StateElementSlice";

import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../utils/workWithCookies";

import "./ButtonChooseProfile.scss";

const ButtonChooseProfile = ({
  text,
  type,
}: {
  text: string;
  type: boolean;
}) => {
  const { profileUser } = ServiceBanyak();
  const { getCookies } = workWithCookies();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const chooseProfile = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const typeProfile = target.getAttribute("data-type");
    const token = getCookies("sessiontokenid");
    console.log(token);

    if (token) {
      try {
        // eslint-disable-next-line
        const getUser = await profileUser(
          token,
          "PUT",
          JSON.stringify({ is_talent: typeProfile })
        );
        navigate("/");
        dispatch(changreMainPreloader(false));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <button
      className="button-chose-profile"
      data-type={type}
      onClick={(e) => chooseProfile(e)}
    >
      {text}
    </button>
  );
};

export default ButtonChooseProfile;
