import { FC } from "react";
import { useAppSelector } from "../../hooks/reduxToolkidHooks";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";

import talantIcon from "../../image/main-page-slider/talant.webp";
import ideaIcon from "../../image/main-page-slider/idea.webp";

import "./MainInstruction.scss";

const MainInstruction: FC = () => {
  const { statusInstr } = useAppSelector((state) => state.stateElement);
  const mainPhoto = statusInstr === "Власник ідеї" ? ideaIcon : talantIcon;

  const instrution = [
    [
      "Зареєструйся",
      "Натисни кнопку додати ідею",
      "Опиши свою ідею та обери потрібних спеціалістів",
      "Опублікуй",
      "Передивись потрібних спеціалістів у розділі Таланти",
    ],
    [
      "Зареєструйся",
      "Заповни свій профіль",
      "Обери цікаву для тебе ідею",
      "Долучись до команди",
      "Опублікуй свій профіль в таланти, щоб отримати цікаві пропозиції.",
    ],
  ];

  const renderInstr = (data: string[]) => {
    return data.map((item, i) => {
      return (
        <li className="instruction__item-info-list-item" key={i}>
          <span className="instruction__item-info-list-item-num">{i + 1}</span>
          <span className="instruction__item-info-list-item-text">{item}</span>
        </li>
      );
    });
  };


  return ( 
    <div className="instruction">
      <div className="instruction__switcher">
        <SwitchToogle prop1={"Власник ідеї"} prop2={"Талант"} />
      </div>
      
      <div className="instruction__item">
        <div className="instruction__item-img">
          <img src={mainPhoto} alt="instruction" />
        </div>
        <div className="instruction__item-info">
          <ul className="instruction__item-info-list">
            {
              statusInstr === "Власник ідеї"
                ? renderInstr(instrution[0])
                : renderInstr(instrution[1])
            }
          </ul>
        </div>
      </div>
    </div>
  );

  
};

export default MainInstruction;
