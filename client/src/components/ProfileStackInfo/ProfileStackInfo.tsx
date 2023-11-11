import {useEffect, useState} from 'react';

import { useAppSelector } from "../../hooks/reduxToolkidHooks";

import ServiceBanyak from '../../service/ServiceBanyak';

import TagsField from "../../atoms/TagsField/TagsField";

import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";

import './ProfileStackInfo.scss';


const ProfileStackInfo = () => {
  const {userProfile} = useAppSelector((state) => state.userInfo);
  const [speciality, setSpeciality] = useState(userProfile?.speciality[0]);
  const [description, setDescription] = useState(userProfile?.description);
  // const [portfolio, setPortfolio] = useState(userProfile?.portfolio);
  // const [stack, setStack] = useState(userProfile?.stack);
  const [AllSteck, setAllSteck] = useState([''])
  const {workWithAllStack} = ServiceBanyak();

  // useEffect(() => {
  //   workWithAllStack('stack-list/', "GET")
  //     .then((res: {name: string}[]) => res.map(item => setAllSteck(stack => [...stack, item.name])))
  // }, [])

  


  const renderStack = () => {
    if (userProfile !== null) {
      

      return (
        <>
         <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">Спеціалізація:</h2>
            <input 
              type="text" 
              // value={speciality ? speciality : ''}  
              // onChange={(e) => setSpeciality(e.target.value)}
              placeholder="UI/UX Designer" 
              className="specialization__input" 
            /> 
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">Про себе:</h2>
            <textarea 
              name="description" 
              id="" 
              className="description about-me__description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Напишіть декілька слів про себе та свій досвід">

            </textarea>
            <p className="about-me__instruction">Опишіть хочаб 1 проєкт над яким працювали</p>
          </div>

          <div className="personal-stack__portfolio portfolio">
            <h2 className="title-h2-l portfolio__title title-mb-20">Посилання на портфоліо:</h2>
            <input className="portfolio__input" type="text" placeholder="https://your-portfolio-link"/>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">Мої технології:</h2>
            <div className="technologies__textfield">
              <TagsField stackUser={userProfile?.stack} allStack={[]}/>
            </div>
            
          </div>
        </>
      )
    }else {
      return ''
    }
  }

  return (
    <div className="personal-stack">
      <div className="personal-stack__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

     {renderStack()}

      <ButtonSmall text="Зберегти"/>
    </div>
  )
}

export default ProfileStackInfo;