import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../../pages/MainPage';
import ToggleTheam from '../../atoms/ToggleTheam/ToggleTheam';
import './App.scss';

function App() {
  return (
    <>
    <div className='app'>
      <Header/>
      <main className='app__main'>
        <MainPage/>
      </main>

      <Footer/>
    </div> 
    </>
   
    

    );
}

export default App;
