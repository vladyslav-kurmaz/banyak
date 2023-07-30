import { FC, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks';
import { changeSlider } from '../SettingMenu/StateElementSlice';


import compIcon from '../../image/main-page-slider/comp.webp';
import flowerIcon from '../../image/main-page-slider/flower.webp';
import blickIcon from '../../image/main-page-slider/blick.webp';
import frontIcon from '../../image/main-page-slider/frontend.webp';
import qaIcon from '../../image/main-page-slider/qa.webp';
import backIcon from '../../image/main-page-slider/backend.webp';
import designerIcon from '../../image/main-page-slider/designer.webp';

import './MainSlider.scss';

const MainSlider: FC = () => {
  const dispatch = useAppDispatch();
  const {mainSlider} = useAppSelector(state => state.stateElement)

  useEffect(() => {
    
    
    const sliders = document.querySelectorAll('[data-num]')
    sliders.forEach((slide, i) => {
      const num = slide.getAttribute('data-num')
      
      if (num !== null && +num === mainSlider) {
        slide.classList.add('input');
        slide.classList.remove('output');
      } 
      else {        
        if (mainSlider < 1 ) {
          sliders[3].classList.remove('input');
          sliders[3].classList.add('output')
          setTimeout(() => sliders[3].classList.remove('output'), 1600)
        } else {
          sliders[mainSlider - 1].classList.remove('input');
          sliders[mainSlider - 1].classList.add('output')
          setTimeout(() => sliders[mainSlider - 1].classList.remove('output'), 1600)
        }        
      }

    })

    if (mainSlider >= 3) {
      setTimeout(() => dispatch(changeSlider(0)), 5000)
    } else {
      setTimeout(() => dispatch(changeSlider(mainSlider + 1)), 5000)
    }
    

  }, [mainSlider])


  return (
    <div className='main-slider'>
      <div className='main-slider__content'>
        <div className="main-slider__content-slide front" data-num={0}>
          <img src={frontIcon} alt="front Icon" className='main-slider__content-slide-img' />
        </div>
        <div className="main-slider__content-slide qa" data-num={1}>
          <img src={qaIcon} alt="qa icon" className='main-slider__content-slide-img' />
        </div>
        <div className="main-slider__content-slide back" data-num={2}>
          <img src={backIcon} alt="back icon" className='main-slider__content-slide-img' />
        </div>
        <div className="main-slider__content-slide design" data-num={3}>
          <img src={designerIcon} alt="design icon" className='main-slider__content-slide-img' />
        </div>
      </div>
        <img src={compIcon} alt="copm" className='main-slider__comp' />
        <img src={blickIcon} alt="bick" className='main-slider__blick' />
        <img src={flowerIcon} alt="bick" className='main-slider__flower' />
    </div>
  )
}

export default MainSlider;