import { FC } from 'react'
import { useAppSelector } from '../../hooks/reduxToolkitHooks'

import './MainSliderStatus.scss'

const MainSliderStatus: FC = () => {
  const { mainPageSlider } = useAppSelector((state) => state.stateElement)

  return (
    <div className="main-slider-status">
      <div className="main-slider-status__element top"></div>
      <div className="main-slider-status__element bottom"></div>
      <div className="main-slider-status__ring">
        <div className="main-slider-status__ring-container">
          <span className="main-slider-status__ring-container-active">
            {`${mainPageSlider + 1} `}{' '}
          </span>
          <span className="main-slider-status__ring-container-text">step/</span>
          <span className="main-slider-status__ring-container-all">2</span>
        </div>
      </div>
    </div>
  )
}

export default MainSliderStatus
