import { FC } from 'react';

import MainInfo from "../components/MainInfo/MainInfo";
import MainSlider from '../components/MainSlider/MainSlider';

const MainPage = () => {
  return (
    <main className='main'>
      <div className="main__slide-one main__slide-item">
        <MainInfo/>
        <MainSlider/>
      </div>
      {/* <div className="main__slide-two main__slide-item">
        <MainInfo/>
        <MainSlider/>
      </div> */}
    </main>
    
  )
}

export default MainPage;