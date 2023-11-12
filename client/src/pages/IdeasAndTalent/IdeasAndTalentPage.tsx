import { useEffect, useState } from "react";
import ServiceBanyak from "../../service/ServiceBanyak";
import { useAppDispatch } from "../../hooks/reduxToolkidHooks";


import { Talent } from "../../types/types";
import { changreMainPreloader } from "../../components/SettingMenu/StateElementSlice";

import ButtonMoreLoading from "../../atoms/ButtonMoreLoading/ButtonMoreLoading";
import Idea from "../../components/Idea/Idea";
import Talant from "../../components/Talant/Talant";

import "./IdeasAndTalent.scss";

const IdeasAndTalent = ({ type }: { type: boolean }) => {
  const [talents, setTalents] = useState();

  const { getTalents } = ServiceBanyak();
  const dispatch = useAppDispatch()

  useEffect(() => {
    getTalents()
      .then((res) => res.json())
      .then((res) => setTalents(res))
      .then(() => dispatch(changreMainPreloader(false)))
  }, []);

  
  const renderItems = (type: boolean, data: Talent[]) => {
    
    

    return data.map(item => {
      return (
        <>
          {type ? <Idea myIdea={false} /> : <Talant dataUser={item}/>} 
        </>
      )
    })
  };

  return (
    <div className="ideaAndTalent">
      {/* {renderItems(type)} */}
      {/* {type ? <Idea myIdea={false}/> : <Talant />}
      {type ? <Idea myIdea={false}/> : <Talant />} */}

      {talents ? renderItems(type, talents) : null}

      {type ? (
        <ButtonMoreLoading text={"ідей"} />
      ) : (
        <ButtonMoreLoading text={"талантів"} />
      )}
    </div>
  );
};

export default IdeasAndTalent;
