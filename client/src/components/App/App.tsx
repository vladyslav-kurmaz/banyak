import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';



import './App.scss';

function App() {

  

  return (
    <>
    <div className='app'>
      <Header/>
      <main className='app__main'>
        <Outlet/>
        {/* <MainPage/> */}
      </main>

      <Footer/>
    </div> 
    </>
   
    

    );
}

export default App;
