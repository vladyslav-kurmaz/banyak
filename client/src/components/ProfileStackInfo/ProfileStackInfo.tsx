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
  userProfil,
  fnState,
  disabled,
  newUserProfile,
}: {
  stack: { id: string; name: string }[];
  userProfil: TUserProfile
  fnState: React.Dispatch<React.SetStateAction<TprofileChange>>;
  disabled: boolean;
  newUserProfile: TprofileChange;
}) => {
  console.log(newUserProfile);
  
  // const [speciality, setSpeciality] = useState(userStack?.speciality[0]);
  // const [description, setDescription] = useState(userStack?.description);
  const dispatch = useAppDispatch();
  // const [portfolio, setPortfolio] = useState(userProfile?.portfolio);
  // const [stack, setStack] = useState(userProfile?.stack);

  const { profileUser } = ServiceBanyak();
  const { getCookies } = workWithCookies();

  // console.log(userProfil);
  // console.log(userProfil);

  const changeProfileData = () => {
    const token = getCookies("sessiontokenid");

    if (typeof token === "string") {


      const formData = new FormData;
      
      // formData.append('description', newUserProfile.description);
      // formData.append('portfolio', newUserProfile.portfolio);

      // if (newUserProfile.speciality) {
      //   console.log(newUserProfile);
        
      //   formData.append('speciality', newUserProfile.speciality);
      // }
      
      // if (newUserProfile.stack && newUserProfile.stack.length > 0) {
      //   formData.append('stack', JSON.stringify(newUserProfile.stack));
      // }

      // if (typeof newUserProfile.avatar !== 'string' && newUserProfile.avatar) {
      //   formData.append('avatar', newUserProfile.avatar);
      // }

      // if (newUserProfile.is_talent) {
      //   formData.append('is_talent', JSON.stringify(newUserProfile.is_talent));
      // }

      // if (newUserProfile.ideas) {        
      //   formData.append('ideas', JSON.stringify(newUserProfile.ideas));
      // }

      // if (newUserProfile.is_military) {
      //   formData.append('is_military', JSON.stringify(newUserProfile.is_military));
      // }
      // if (newUserProfile.is_vpo) {
      //   formData.append('is_vpo', JSON.stringify(newUserProfile.is_vpo));
      // }

      

      

      
      // const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      
      // console.log(newUserProfile);
      
      // const formDataObject: Record<string, FormDataEntryValue> = {};
      // formData.forEach((value, key) => {

      //   // console.log(typeof value);
        
      //   // console.log(key, value);
        
      //   formDataObject[key] = value;
      // });
    
      // console.log(formData.getAll('speciality'));
      
      profileUser(token, "PUT", JSON.stringify(newUserProfile))
        .then((res) => {
          console.log(res);
          
        })
        .then(() =>
          dispatch(changreMainPreloader(false))
        );
    }

    // newUserProfile
  };

  const renderStack = () => {
    if (userProfil !== null) {
      return (
        <>
          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">
              Спеціалізація:
            </h2>
            <input
              type="text"
              value={newUserProfile.speciality ? newUserProfile?.speciality[0].name : ""}
              onChange={(e) => fnState((state) => ({ ...state, speciality: [{name: e.target.value}]}))}
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
              value={newUserProfile?.description}
              onChange={(e) => {
                // setDescription(e.target.value);
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
              value={newUserProfile?.portfolio ? newUserProfile?.portfolio : ''}
              onChange={(e) => {
                // setDescription(e.target.value);
                fnState((state) => ({ ...state, portfolio: e.target.value }));
              }}
            />
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Мої технології:
            </h2>
            <div className="technologies__textfield">
              <TagsField
                stackUser={userProfil?.stack}
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
