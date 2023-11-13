import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxToolkidHooks";

import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../untils/workWithCookies";
import { TUserProfile, TprofileChange } from "../../types/types";

import TagsField from "../../atoms/TagsField/TagsField";

import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";

import "./ProfileStackInfo.scss";
import { changreMainPreloader } from "../SettingMenu/StateElementSlice";

// export type TUserProfile = {
const ProfileStackInfo = ({
  stack,
  userStack,
  fnState,
  disabled,
  newUserProfile,
}: {
  stack: { id: string; name: string }[];
  userStack: TUserProfile;
  fnState: React.Dispatch<React.SetStateAction<TprofileChange>>;
  disabled: boolean;
  newUserProfile: TprofileChange;
}) => {
  const [speciality, setSpeciality] = useState(userStack?.speciality[0]);
  const [description, setDescription] = useState(userStack?.description);
  const dispatch = useAppDispatch();
  // const [portfolio, setPortfolio] = useState(userProfile?.portfolio);
  // const [stack, setStack] = useState(userProfile?.stack);

  const { profileUser } = ServiceBanyak();
  const { getCookies } = workWithCookies();

  const changeProfileData = () => {
    const token = getCookies("sessiontokenid");

    if (typeof token === "string") {

      

      // profileUser(token, "PUT", JSON.stringify(newUserProfile)).then(() =>
      //   dispatch(changreMainPreloader(false))
      // );

    // speciality: [],
    // stack: [],
    // avatar: null,
    // description: "",
    // is_talent: false,
    // is_military: false,
    // is_vpo: false,
    // ideas: [],

      const formData = new FormData;

      // if (newUserProfile.speciality) {
      //   formData.append('speciality', newUserProfile.speciality);
      // }

      // if (newUserProfile.speciality) {
      //   formData.append('speciality', JSON.stringify(newUserProfile.speciality));
      // }
      
      // if (newUserProfile.stack && newUserProfile.stack.length > 0) {
      //   formData.append('stack', JSON.stringify(newUserProfile.stack));
      // }
      formData.append('description', newUserProfile.description);
      
      // formData.append('stack', newUserProfile.stack);

      if (newUserProfile.avatar) {
        formData.append('avatar', newUserProfile.avatar);
      }

      // if (newUserProfile.is_talent) {
      //   formData.append('is_talent', JSON.stringify(newUserProfile.is_talent));
      // }
      // if (newUserProfile.is_military) {
      //   formData.append('is_military', JSON.stringify(newUserProfile.is_military));
      // }
      // if (newUserProfile.is_vpo) {
      //   formData.append('is_vpo', JSON.stringify(newUserProfile.is_vpo));
      // }
      // if (newUserProfile.ideas) {
      //   formData.append('ideas', JSON.stringify(newUserProfile.ideas));
      // }
      
      // const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      
      // const formDataObject: Record<string, FormDataEntryValue> = {};
      // formData.forEach((value, key) => {
      //   formDataObject[key] = value;
      // });

// Конвертуйте об'єкт в JSON
// const jsonData = JSON.stringify(formDataObject);
      
      

      

      profileUser(token, "PUT", formData)
        .then(() =>
          dispatch(changreMainPreloader(false))
        );
    }

    // newUserProfile
  };

  const renderStack = () => {
    if (userStack !== null) {
      return (
        <>
          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">
              Спеціалізація:
            </h2>
            <input
              type="text"
              // value={speciality ? speciality : ''}
              // onChange={(e) => setSpeciality(e.target.value)}
              placeholder="UI/UX Designer"
              className="specialization__input"
            />
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">
              Про себе:
            </h2>
            <textarea
              name="description"
              id=""
              className="description about-me__description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                fnState((state) => ({ ...state, description: e.target.value }));
              }}
              placeholder="Напишіть декілька слів про себе та свій досвід"
            ></textarea>
            <p className="about-me__instruction">
              Опишіть хочаб 1 проєкт над яким працювали
            </p>
          </div>

          <div className="personal-stack__portfolio portfolio">
            <h2 className="title-h2-l portfolio__title title-mb-20">
              Посилання на портфоліо:
            </h2>
            <input
              className="portfolio__input"
              type="text"
              placeholder="https://your-portfolio-link"
            />
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Мої технології:
            </h2>
            <div className="technologies__textfield">
              <TagsField
                stackUser={userStack?.stack}
                changeStack={fnState}
                allStack={stack}
              />
            </div>
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <div className="personal-stack">
      <div className="personal-stack__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      {renderStack()}

      <ButtonSmall fn={changeProfileData} text="Зберегти" />
    </div>
  );
};

export default ProfileStackInfo;
