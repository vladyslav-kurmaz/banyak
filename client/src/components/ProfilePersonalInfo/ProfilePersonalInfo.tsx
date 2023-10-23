import { useState, useRef } from "react";

import ChangeInputSpan from "../../atoms/ChangeInputSpan/ChangeInputSpan";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";
import logo from "../../image/logo/small_logo.webp";

import "./ProfilePersonalInfo.scss";

const ProfilePersonalInfo = () => {
  const [name, setName] = useState(true);
  const [nameWrite, setNameWrite] = useState("Катерина Білокур");

  // const inputRef = useRef(null);

  return (
    <div className="personal-info">
      <div className="personal-info__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      <div className="personal-info__main-info">
        <img src={logo} className="personal-info__avatar" alt="User avatar" />
        <label
          htmlFor="avatar-change"
          className="personal-info__changed-avatar"
        >
          Замінити фото
          <input type="file" id="avatar-change" />
        </label>

        <ChangeInputSpan value="Катерина Білокур"/>
        {/* <label
          
          htmlFor="personal__name"
          
        >

          {name ? (
            <span className="personal__name-span">{nameWrite}</span>
          ) : (
            <input
              type="text"
              className="personal__name-span"
              id="personal__name"
              value={nameWrite}
            />
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            onClick={(e) => {
              setName(!name);
              console.log(e);
              
            }}
          >
            <path
              d="M11.4244 23.5756L22.3052 12.6948L27.1539 17.5435L16.2731 28.4244L11.4346 28.4346L11.4244 23.5756Z"
              fill="#1C145E"
            />
            <rect
              x="23.5562"
              y="11.4639"
              width="3.42857"
              height="6.85714"
              transform="rotate(-45 23.5562 11.4639)"
              fill="#1C145E"
            />
          </svg>

        </label> */}

        
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
