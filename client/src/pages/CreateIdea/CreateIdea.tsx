import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxToolkidHooks'; 

import ButtonBack from '../../atoms/ButtonBack/ButtonBack';
import TagsField from "../../atoms/TagsField/TagsField";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

import logo from '../../image/logo/small_logo.webp';

import './CreateIdea.scss';

const CreateIdea = () => {
  type TCreateNewIdea = {
    name: string;
    description: string;
    experts: {name: string}[];
    stack: {name: string}[];
  }

  const {allStack} = useAppSelector(state => state.userInfo);

  const [newIdeaData, setNewIdeaData] = useState<TCreateNewIdea>()

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
              <input className="personal-info__input" type="file" id="avatar-change" />
            </label>
          </div>

        </div>

        <div className="personal-stack">

          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">Назва ідеї:</h2>
            <input type="text" placeholder="Сайт Арт-платформа" className="specialization__input" />
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">Про їдею:</h2>
            <textarea
              name="description"
              id=""
              value={newIdeaData?.description}
              className="description about-me__description"
              placeholder="Шукаю бажаючих долучитись до розробки ідеї арт-сайту.">

            </textarea>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">Потрібні фахівці:</h2>
            
            {/* <textarea 
          name="description" 
          id="" 
          className="description technologies__description"
          placeholder="Почніть вводити технології та з'явиться список"
          // value={<h2 className="title-h2-l technologies__title">Посилання на портфоліо:</h2>}
          > 
        </textarea> */}

            <div className="technologies__textfield">
              {/* <TagsField /> */}
            </div>

          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">Потрібні технології:</h2>
            {/* <textarea 
          name="description" 
          id="" 
          className="description technologies__description"
          placeholder="Почніть вводити технології та з'явиться список"
          // value={<h2 className="title-h2-l technologies__title">Посилання на портфоліо:</h2>}
          > 
        </textarea> */}

            <div className="technologies__textfield">
              <TagsField 
                allStack={allStack}
              />
            </div>

          </div>

          <ButtonSmall style={{position: "relative"}} text="Опублікувати ідею" />
        </div>



      </div>
    </div>
  )
}

export default CreateIdea;