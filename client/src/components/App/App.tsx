import React, {useEffect} from 'react';
import { Outlet} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxToolkidHooks';
import { changeOpenOrCloseLoginPopup } from '../SettingMenu/StateElementSlice';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import SingUpPage from '../../pages/SingUpPage';



import './App.scss';

function App() {
  const {loginRegistrationForm} = useAppSelector(state => state.stateElement);
  // const loginRegistrationFormTraslate = loginOrSingUp === 'ВХІД' ? 'login' : 'singup'
  const shouldShowPopup = new URLSearchParams(window.location.search).get('login') === 'true';
  const dispatch = useAppDispatch()

 useEffect(() => {
  
  if (shouldShowPopup) {
    dispatch(changeOpenOrCloseLoginPopup(true))
  } else {
    dispatch(changeOpenOrCloseLoginPopup(false))
  }
 }, [shouldShowPopup])
  
  return (
    <>
    
    <div className='app'>
      <Header/>
      <main className='app__main'>
        <Outlet/>
        {loginRegistrationForm && shouldShowPopup && <SingUpPage/>}
      </main>

      <Footer/>
    </div> 
    </>
   
    

    );
}

export default App;
