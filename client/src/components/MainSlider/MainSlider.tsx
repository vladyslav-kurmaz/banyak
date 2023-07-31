import { MouseEvent } from "react";
import MainSliderStatus from "../../atoms/MainSliderStatus/MainSliderStatus";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkidHooks";

import MainInfo from "../MainInfo/MainInfo";
import MainSliderImg from "../MainSliderImg/MainSliderImg";
import MainInstruction from "../MainInstruction/MainInstruction";

import { changeMainPageSlider } from "../SettingMenu/StateElementSlice";

import "./MainSlider.scss";

const MainSlider = () => {
  const dispatch = useAppDispatch();
  const { mainPageSlider } = useAppSelector((state) => state.stateElement);

  const changeMainSlide: (
    e: MouseEvent<HTMLDivElement>,
    num: number
  ) => void = (e, num) => {
    const target = e.currentTarget;


    if (mainPageSlider === 0) {
      if (!target.parentElement?.classList.contains('active')) {
        target.parentElement?.classList.add('active')
        target.parentElement?.classList.remove('inert')
      }
      console.log(target.parentElement);
    } else {
      if (!target.parentElement?.classList.contains('inert')) {
        target.parentElement?.classList.add('inert')
        target.parentElement?.classList.remove('active')
      }
    }
    
    dispatch(changeMainPageSlider(num));
  };

  const buttonChangeSlide = () => {
    return mainPageSlider === 0 ? (
      <div
        className="main__container-slider-button"
        onClick={(e) => changeMainSlide(e, 1)}
        style={{
          top: "50%",
          right: "50%",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M12 32V30.92L22.7059 20L12 9.08V8H22.5882L32 17.36V22.64L22.5882 32H12Z"
            fill="#061730"
          />
        </svg>
      </div>
    ) : (
      <div
        className="main__container-slider-button"
        onClick={(e) => changeMainSlide(e, 0)}
        style={{
          top: "50%",
          left: "50%",
          transform: "rotate(180deg)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M12 32V30.92L22.7059 20L12 9.08V8H22.5882L32 17.36V22.64L22.5882 32H12Z"
            fill="#061730"
          />
        </svg>
      </div>
    );
  };


  return (
    <div className="main__container">
      <div className="main__container-slider">
        
        <div className="main__container-slider-elem">
          <MainInfo />
          <MainSliderImg />
        </div>

        <div className="main__container-slider-elem">
          <MainInstruction />
        </div>

        {buttonChangeSlide()}
      </div>

      <MainSliderStatus />
    </div>
  );
};

export default MainSlider;
