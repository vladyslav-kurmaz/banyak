import { FC } from 'react';

import './MainInfo.scss';
import { Link } from 'react-router-dom';

const MainInfo: FC = () => {
  return (
    <div className='main-slider__info'>
      <div className="main-slider__info-container">
        <div className='main-slider__info-container-title'>
          BANYAK 
        </div>
        <div className='main-slider__info-container-description'>
          Це ідеальне місце для тих, хто прагне отримати досвід роботи в IT команді, 
          покращити свої навички та розширити професійні горизонти.
        </div>

        <Link 
          to='/ideas'
          className='main-slider__info-container-button'>
          Приєднатись до команди
        </Link>
      </div>
      
    </div>
  )
}

export default MainInfo;