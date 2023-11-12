import { MouseEvent } from "react";
import MainSliderStatus from "../../atoms/MainSliderStatus/MainSliderStatus";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxToolkidHooks";
import { Link } from "react-router-dom";

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
      if (
        target &&
        !target.parentElement?.parentElement?.classList.contains("active")
      ) {
        target.parentElement?.parentElement?.classList.add("active");
        target.parentElement?.parentElement?.classList.remove("inert");
      }
    } else {
      if (!target.parentElement?.parentElement?.classList.contains("inert")) {
        target.parentElement?.parentElement?.classList.add("inert");
        target.parentElement?.parentElement?.classList.remove("active");
      }
    }

    dispatch(changeMainPageSlider(num));
  };

  // const buttonChangeSlide = () => {
  //   return mainPageSlider === 0 ? (
  //     <div
  //       className="main-slider__container-slider-button"
  //       onClick={(e) => changeMainSlide(e, 1)}
  //       style={{
  //         top: "50%",
  //         right: "1%",
  //       }}
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="40"
  //         height="40"
  //         viewBox="0 0 40 40"
  //         fill="none"
  //       >
  //         <path
  //           d="M12 32V30.92L22.7059 20L12 9.08V8H22.5882L32 17.36V22.64L22.5882 32H12Z"
  //           fill="#061730"
  //         />
  //       </svg>
  //     </div>
  //   ) : (
  //     <div
  //       className="main-slider__container-slider-button"
  //       onClick={(e) => changeMainSlide(e, 0)}
  //       style={{
  //         top: "50%",
  //         right: "-10%",
  //         transform: "rotate(180deg)",
  //       }}
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="40"
  //         height="40"
  //         viewBox="0 0 40 40"
  //         fill="none"
  //       >
  //         <path
  //           d="M12 32V30.92L22.7059 20L12 9.08V8H22.5882L32 17.36V22.64L22.5882 32H12Z"
  //           fill="#061730"
  //         />
  //       </svg>
  //     </div>
  //   );
  // };

  function sliderWidth() {
    if (window.screen.width > 1200) {
      return 2400;
    } else {
      return window.screen.width * 2;
    }
  }

  return (
    <div className="main-slider__container">
      <div
        className="main-slider__container-slider"
        style={{ maxWidth: `${sliderWidth()}px` }}
      >
        <div className="main-slider__container-slider-elem">
          <MainInfo />
          <MainSliderImg />

          <div
            className="main-slider__container-slider-button"
            onClick={(e) => changeMainSlide(e, 1)}
            style={{
              top: "50%",
              right: "1%",
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
        </div>

        <div className="main-slider__container-slider-elem">
          <MainInstruction />
          <div
            className="main-slider__container-slider-button"
            onClick={(e) => changeMainSlide(e, 0)}
            style={{
              top: "46%",
              left: "1%",
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
        </div>

        {/* {buttonChangeSlide()} */}
      </div>

      <MainSliderStatus />

      <Link to="/ideas" className="main-slider__container-button">
        Приєднатись до команди
      </Link>
    </div>
  );
};

export default MainSlider;
