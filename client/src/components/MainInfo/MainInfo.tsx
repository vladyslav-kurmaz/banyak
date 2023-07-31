import { FC } from 'react';

import './MainInfo.scss';

const MainInfo: FC = () => {
  return (
    <div className='main__info'>
      <div className="main__info-container">
        <div className='main__info-container-title'>
          BANYAK 
        </div>
        <div className='main__info-container-description'>
          Це ідеальне місце для тих, хто прагне отримати досвід роботи в IT команді, 
          покращити свої навички та розширити професійні горизонти.
        </div>

        <a className='main__info-container-button' href="#">
          Приєднатись до команди
        </a>
      </div>
      
    </div>
  )
}

export default MainInfo;