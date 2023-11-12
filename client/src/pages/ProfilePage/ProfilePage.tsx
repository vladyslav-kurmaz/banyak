import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkidHooks";
import ServiceBanyak from "../../service/ServiceBanyak";

import { changreMainPreloader } from "../../components/SettingMenu/StateElementSlice"; 

import ProfilePersonalInfo from "../../components/ProfilePersonalInfo/ProfilePersonalInfo";
import ProfileStackInfo from "../../components/ProfileStackInfo/ProfileStackInfo";
import IdeasPopup from "../../components/IdeasPopup/IdeasPopup";

import "./ProfilePage.scss";
import { TUserProfile, TprofileChange } from "../../types/types";


const ProfilePage = ({
  fc,
}: {
  fc: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [AllSteck, setAllSteck] = useState<
    null | { id: string; name: string }[]
  >(null);
  const { userProfile } = useAppSelector((state) => state.userInfo);
  const { workWithAllStack } = ServiceBanyak();
  const [disabled, setDisabled] = useState(false);
  const dispatch = useAppDispatch()

  const [newUserData, setNewUserData] = useState<TprofileChange>({
    speciality: [],
    stack: [],
    avatar: null,
    description: "",
    is_talent: false,
    is_military: false,
    is_vpo: false,
    ideas: [],
  });

  // const [stack, setStack] = useState()

  useEffect(() => {
    workWithAllStack("stack-list/", "GET")
      
      // .then((res) => {
      //   console.log(res.results);
      //   return res.results
      // })
      .then((res: { results: { id: string; name: string }[] }) =>
        setAllSteck(res.results)
      )
      .then(() => dispatch(changreMainPreloader(false)))
    // )
  }, []);

  return (
    <div className="profile profile__inside profile__outside">
      <ProfilePersonalInfo changeData={setNewUserData} fc={fc} />
      {AllSteck !== null && userProfile !== null ? (
        <ProfileStackInfo
          userStack={userProfile}
          disabled={disabled}
          fnState={setNewUserData}
          stack={AllSteck}
          newUserProfile={newUserData}
        />
      ) : null}
    </div>
  );
};

export default ProfilePage;
