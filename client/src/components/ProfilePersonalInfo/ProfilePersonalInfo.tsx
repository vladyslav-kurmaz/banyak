import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxToolkidHooks";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";
import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../utils/workWithCookies";
import { changreMainPreloader } from "../SettingMenu/StateElementSlice";
import { changeUserProfile } from "../../store/userSlice";
import logo from "../../image/logo/small_logo.webp";

import "./ProfilePersonalInfo.scss";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

import chat from "../../image/header/chat.svg";
import lampIcon from "../../image/icon/idea.svg";
import plusIcon from "../../image/icon/PLUS.svg";

const ProfilePersonalInfo = ({
  fc,
}: // changeData,
{
  fc: React.Dispatch<React.SetStateAction<boolean>>;
  // changeData: React.Dispatch<React.SetStateAction<TprofileChange | null>>;
}) => {
  // const [name, setName] = useState(true);
  // const [nameWrite, setNameWrite] = useState("Катерина Білокур");

  const dispatch = useAppDispatch();
  const { updatPhoto, profileUser } = ServiceBanyak();
  const [newAvatar, setNewAvatar] = useState<string | File>("");
  const { getCookies } = workWithCookies();

  // const inputRef = useRef(null);

  const { userProfile } = useAppSelector((state) => state.userInfo);
  // const {} = userProfile as TUserProfile

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const target = e.target;
    if (target && target.files !== null) {
      const file = target.files[0];
      // console.log(userProfile);

      setNewAvatar(file);
    }
  };

  const sendNewAvatar = async () => {
    const token = getCookies("sessiontokenid");
    const formData = new FormData();

    formData.append("avatar_profile", newAvatar);

    if (typeof token === "string") {
      try {
        // eslint-disable-next-line
        const updatePhoto = await updatPhoto(token, "PUT", formData);
        const updateProfile = await profileUser(token, "GET");

        dispatch(changeUserProfile(await updateProfile));
        setNewAvatar("");
        dispatch(changreMainPreloader(false));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const renderUserInfo = () => {
    if (userProfile !== null) {

      const { user, avatar } = userProfile;

      const newAvatarBlob = newAvatar as File;

      const imageUrl = newAvatarBlob ? URL.createObjectURL(newAvatarBlob) : "";

      const avatarOrPlug =
        (avatar && avatar.avatar_profile !== null) || imageUrl ? (
          <img
            src={
              newAvatar !== ""
                ? imageUrl
                : `http://localhost:8000${avatar.avatar_profile}`
            }
            className={`personal-info__avatar`}
            alt="User avatar"
          />
        ) : (
          <img src={logo} className="personal-info__avatar" alt="User avatar" />
        );
      return (
        <>
          {avatarOrPlug}

          <div className="personal-info__container">
            {newAvatar === "" ? (
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
            ) : (
              <div className="personal-info__update">
                <h2 className="personal-info__question">
                  Ви бажаєте змінити фото?
                </h2>
                <ul className="personal-info__list">
                  <li className="personal-info__button">
                    <ButtonSmall
                      text="Так"
                      fn={() => sendNewAvatar()}
                    ></ButtonSmall>
                  </li>
                  <li className="personal-info__button">
                    <ButtonSmall
                      text="Ні"
                      fn={() => setNewAvatar("")}
                    ></ButtonSmall>
                  </li>
                </ul>
              </div>
            )}

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

        <div className="personal-info__buttons">
          <div className="personal-info__button-outside personal-info__chat">
            <ButtonSmall text="Чат" icon={chat} />
          </div>

          <div className="personal-info__button-outside personal-info__my-idea">
            <ButtonSmall text="Мої ідеї" fn={() => fc(true)} icon={lampIcon} />
          </div>
          <div className="personal-info__button-outside personal-info__add-idea">
            <ButtonSmall
              text="Додати ідею"
              icon={plusIcon}
              href="/create-idea"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
