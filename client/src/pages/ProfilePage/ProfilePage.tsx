import React, { useState } from 'react';
import ProfilePersonalInfo from '../../components/ProfilePersonalInfo/ProfilePersonalInfo';
import ProfileStackInfo from '../../components/ProfileStackInfo/ProfileStackInfo';
import IdeasPopup from '../../components/IdeasPopup/IdeasPopup';

import './ProfilePage.scss';


const ProfilePage = ({fc}: {fc: React.Dispatch<React.SetStateAction<boolean>>}) => {



  return (
    <div className="profile profile__inside profile__outside">
      
  
      <ProfilePersonalInfo fc={fc}/>
      <ProfileStackInfo/>
    </div>
  )
}

export default ProfilePage;