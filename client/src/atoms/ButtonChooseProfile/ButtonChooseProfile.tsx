import { MouseEvent } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../untils/workWithCookies";

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

  const navigate = useNavigate();
  const location = useLocation();


  const chooseProfile = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const typeProfile = target.getAttribute("data-type");
    const token = getCookies("_id");

    if (token) {
      profileUser(token, "PUT", JSON.stringify({ is_talent: typeProfile }))
        .then(() => navigate(location.pathname))
        .then(res => console.log(res))
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
