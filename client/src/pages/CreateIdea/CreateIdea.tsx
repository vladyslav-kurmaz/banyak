import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkidHooks";

import ButtonBack from "../../atoms/ButtonBack/ButtonBack";
import logo from "../../image/logo/small_logo.webp";

import TagFieldSpeciality from "../../atoms/TagFieldSpeciality/TagFieldSpeciality";
import TagsField from "../../atoms/TagsField/TagsField";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

import { TIdeasChange, TprofileChange } from "../../types/types";

import "./CreateIdea.scss";

const CreateIdea = () => {
  const dispatch = useAppDispatch();
  const { allStack } = useAppSelector((state) => state.userInfo);

  const [newIdeaData, setNewIdeaData] = useState<TprofileChange | null>({
    name: "",
    speciality: [],
    stack: [],
    description: "",

    portfolio: "",
  });

  return (
    <div className="create-idea  create-idea__outside">
      <div className="create-idea__button-back">
        <ButtonBack />
      </div>

      <div className="create-idea__inside">
        <div className="personal-info__main-info">
          <img src={logo} className="personal-info__avatar" alt="User avatar" />

          <div className="personal-info__container">
            <label
              htmlFor="avatar-change"
              className="personal-info__changed-avatar"
            >
              Замінити фото
              <input
                className="personal-info__input"
                type="file"
                id="avatar-change"
              />
            </label>
          </div>
        </div>

        <div className="personal-stack">
          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">
              Назва ідеї:
            </h2>
            <input
              type="text"
              placeholder="Сайт Арт-платформа"
              className="specialization__input"
              value={newIdeaData?.name}
              onChange={(e) => setNewIdeaData(state => state && ({...state, name: e.target.value}))}
            />
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">
              Про їдею:
            </h2>
            <textarea
              name="description"
              id=""
              value={newIdeaData?.description}
              className="description about-me__description"
              placeholder="Шукаю бажаючих долучитись до розробки ідеї арт-сайту."
              onChange={(e) => setNewIdeaData(state => state && ({...state, description: e.target.value}))}
            ></textarea>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Потрібні фахівці:
            </h2>

            {/* <textarea 
          name="description" 
          id="" 
          className="description technologies__description"
          placeholder="Почніть вводити технології та з'явиться список"
          // value={<h2 className="title-h2-l technologies__title">Посилання на портфоліо:</h2>}
          > 
        </textarea> */}

            <div className="technologies__textfield">
              <TagFieldSpeciality
                speciality={[]}
                allSpeciality={[]}
                changeSpeciality={setNewIdeaData}
              />
            </div>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Потрібні технології:
            </h2>
            {/* <textarea 
          name="description" 
          id="" 
          className="description technologies__description"
          placeholder="Почніть вводити технології та з'явиться список"
          // value={<h2 className="title-h2-l technologies__title">Посилання на портфоліо:</h2>}
          > 
        </textarea> */}

            <div className="technologies__textfield">
              {newIdeaData !== null ? (
                <TagsField
                  allStack={allStack}
                  stackUser={newIdeaData.stack}
                  changeStack={setNewIdeaData}
                />
              ) : null}
            </div>
          </div>

          <ButtonSmall
            style={{ position: "relative" }}
            text="Опублікувати ідею"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
