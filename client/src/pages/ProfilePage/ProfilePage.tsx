import ProfilePersonalInfo from '../../components/ProfilePersonalInfo/ProfilePersonalInfo';
import ProfileStackInfo from '../../components/ProfileStackInfo/ProfileStackInfo';

import './ProfilePage.scss';

const ProfilePage = () => {
  return (
    <div className="profile profile__inside profile__outside">
      <ProfilePersonalInfo/>
      <ProfileStackInfo/>
    </div>
  )
}

export default ProfilePage;