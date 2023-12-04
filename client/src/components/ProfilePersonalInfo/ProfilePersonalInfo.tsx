import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxToolkidHooks";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";
import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../untils/workWithCookies";
import { changreMainPreloader } from "../SettingMenu/StateElementSlice";

import logo from "../../image/logo/small_logo.webp";

import "./ProfilePersonalInfo.scss";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

import { TUserProfile, TprofileChange } from "../../types/types";

import chat from "../../image/header/chat.svg";
import lampIcon from "../../image/icon/idea.svg";
import plusIcon from "../../image/icon/PLUS.svg";
import { Link } from "react-router-dom";


const ProfilePersonalInfo = ({
  fc,
  changeData,
}: {
  fc: React.Dispatch<React.SetStateAction<boolean>>;
  changeData: React.Dispatch<React.SetStateAction<TprofileChange>>;
}) => {
  // const [name, setName] = useState(true);
  // const [nameWrite, setNameWrite] = useState("Катерина Білокур");

  const dispatch = useAppDispatch()
  const {updatPhoto} = ServiceBanyak()
  const [newAvatar, setNewAvatar] = useState<string | File>('');
  const { getCookies } = workWithCookies();

  // const inputRef = useRef(null);

  const { userProfile } = useAppSelector((state) => state.userInfo);
  // const {} = userProfile as TUserProfile

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const target = e.target;
    if (target && target.files !== null) {
      const file = target.files[0];
      console.log(userProfile);
      
      setNewAvatar(file);
      // changeData((state) => ({
      //   ...state,
      //   avatar: file,
      // }));
    }
  };

  const sendNewAvatar = () => {
    const token = getCookies("sessiontokenid");
    const formData = new FormData;

    formData.append('avatar_profile', newAvatar);

    if (typeof token === "string") {
      updatPhoto(token, 'PUT', formData)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => {
        setNewAvatar('')
        dispatch(changreMainPreloader(false))
      })

    }

    
  }


  const renderUserInfo = () => {
    if (userProfile !== null) {
      const { user, avatar, is_military, is_vpo } = userProfile;
      // const militaty = is_military ? 'military' : '';
      // const vpo = is_vpo ? 'vpo' : '';

      const avatarOrPlug =
        avatar === null ? (
          <img src={logo} className="personal-info__avatar" alt="User avatar" />
        ) : (
          <img
            src={`http://localhost:8000${avatar}`}
            className={`personal-info__avatar`} 
            alt="User avatar"
          />
        );
      return (
        <>
          {avatarOrPlug}

          <div className="personal-info__container">
            {
              newAvatar === '' 
              ?
              <label
                htmlFor="avatar-change"
                className="personal-info__changed-avatar"
              >
                Замінити фото
                <input
                  className="personal-info__input"
                  type="file"
                  id="avatar-change"
                  onChange={(e) => changeFile(e, "avatar")}
                />
              </label>
              :
              <div>
                <h2>Ви бажаєте змінити фото</h2>
                <ButtonSmall text="Так" fn={() => sendNewAvatar()}></ButtonSmall>
                <ButtonSmall text="Ні" fn={() => setNewAvatar('')}></ButtonSmall>
              </div>
            }

            <span className="personal-info__name">
              {user.first_name} {user.last_name}
            </span>
            <span className="personal-info__email">{user.email}</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="personal-info">
      <div className="personal-info__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      <div className="personal-info__main-info">
        {renderUserInfo()}

        <div className="personal-info__statuses">
          {/* <div className="personal-info__statuses-container">
            <label htmlFor="vpo" className="personal-info__special-status">
              Статус ВПО
              <input
                className="personal-info__input"
                onChange={(e) => changeFile(e, "upload_vpo")}
                type="file"
                id="vpo"
              />
            </label>
          </div> */}

          {/* <div className="personal-info__statuses-container">
            <label htmlFor="soldie" className="personal-info__special-status">
              Статус Військовий
              <input
                className="personal-info__input"
                type="file"
                id="soldier"
                onChange={(e) => changeFile(e, "upload_military")}
              />
            </label>
          </div> */}
        </div>

        <div className="personal-info__buttons">
          <div className="personal-info__button-outside personal-info__chat">

            <ButtonSmall text="Чат" icon={chat} />

          </div>

          <div className="personal-info__button-outside personal-info__my-idea">

            <ButtonSmall text="Мої ідеї" fn={() => fc(true)} icon={lampIcon} />
          </div>
          <div className="personal-info__button-outside personal-info__add-idea">
            {/* <Link to={'/create-idea'} > */}
            <ButtonSmall
              text="Додати ідею"
              icon={plusIcon}
              href="/create-idea"
            />
            {/* </Link> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
