import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkidHooks'


import TagsField from "../../atoms/TagsField/TagsField";
import ServiceBanyak from "../../service/ServiceBanyak";
import workWithCookies from "../../utils/workWithCookies";
import validationProfile from "../../utils/validationProfile";

import { TGetAllStack, TUserProfile, TprofileChange } from "../../types/types";
import { changreMainPreloader } from "../SettingMenu/StateElementSlice";
import { changeAllStack } from "../../store/userSlice";

import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";

import "./ProfileStackInfo.scss";

const ProfileStackInfo = ({
  userProfil,
  fnState,
  disabled,
  newUserProfile,
}: {

  userProfil: TUserProfile;
  fnState: React.Dispatch<React.SetStateAction<TprofileChange | null>>;
  disabled: boolean;
  newUserProfile: TprofileChange;
}) => {
  const dispatch = useAppDispatch();

  const [buttonDisable, setButtonDisable] = useState(true);

  const { profileUser, getAllStack } = ServiceBanyak();
  const { getCookies } = workWithCookies();
  const { allStack } = useAppSelector((state) => state.userInfo);

  const speciality =
      newUserProfile.speciality && newUserProfile?.speciality[0]
        ? newUserProfile?.speciality[0].name
        : "";
    const description = newUserProfile?.description;
    const portfolio = newUserProfile?.portfolio
      ? newUserProfile?.portfolio
      : ""
  ;

  useEffect(() => {
    if (!disabled && !validationProfile(portfolio, 'portfolio')?.errorStatus) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [disabled, validationProfile(portfolio, 'portfolio')?.errorStatus])

  useEffect(() => {
    if (allStack! as TGetAllStack) {
      getAllStack("stack-list/", "GET")
        .then((res: { results: { name: string }[] }) => {
          const result = res.results.map((item) => item.name);
          dispatch(changeAllStack(result));
        })
        .then(() => dispatch(changreMainPreloader(false)));
    }
    // eslint-disable-next-line
  }, []);

  const changeProfileData = () => {
    const token = getCookies("sessiontokenid");

    if (typeof token === "string") {
      console.log(newUserProfile);

      profileUser(token, "PUT", JSON.stringify(newUserProfile))
        .then((res) => {
          console.log(res);
        })
        .then(() => dispatch(changreMainPreloader(false)));
    }
  };

  const renderStack = () => {
    

    if (userProfil !== null && newUserProfile !== null) {
      return (
        <>
          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">
              Спеціалізація:
            </h2>
            <input
              type="text"
              value={speciality}
              onChange={(e) => {
                fnState((state) =>
                  state && state !== null
                    ? { ...state, speciality: [{ name: e.target.value }] }
                    : null
                );
              }}
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
                fnState((state) =>
                  state && state !== null
                    ? { ...state, description: e.target.value }
                    : null
                );
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
            <label className="portfolio__label personal-stack__label">
              <input
                className={`portfolio__input portfolio__input-${validationProfile(portfolio, 'portfolio')?.class}`}
                type="text"
                placeholder="https://your-portfolio-link"
                value={portfolio}
                onChange={(e) => {
                  fnState((state) =>
                    state && state !== null
                      ? { ...state, portfolio: e.target.value }
                      : null
                  );
                }}
              />
              {validationProfile(portfolio, 'portfolio')?.errorStatus ? <div className="personal-stack__error">{validationProfile(portfolio, 'portfolio')?.message}</div> : null}
            </label>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Мої технології:
            </h2>
            {allStack.length > 0 ? (
              <div className="technologies__textfield">
                <TagsField
                  stackUser={userProfil?.stack}
                  changeStack={fnState}
                  allStack={allStack}
                />
              </div>
            ) : null}
          </div>
        </>
      )
    } else {
      return ''
    }
  }

  return (
    <div className="personal-stack">
      <div className="personal-stack__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      {renderStack()}

      <button
        onClick={changeProfileData}
        className="personal-stack__button buttonSmall"
        disabled={buttonDisable}
      >
        Зберегти
      </button>
    </div>
  )
}

export default ProfileStackInfo
