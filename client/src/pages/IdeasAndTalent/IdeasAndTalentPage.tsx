import {useEffect, useState} from 'react';
import ServiceBanyak from "../../service/ServiceBanyak";

import ButtonMoreLoading from "../../atoms/ButtonMoreLoading/ButtonMoreLoading";
import Idea from "../../components/Idea/Idea";
import Talant from "../../components/Talant/Talant";

import './IdeasAndTalent.scss';

const IdeasAndTalent = ({ type }: { type: boolean }) => {
  const [talents, setTalents] = useState()

  const {getTalents} = ServiceBanyak();

  useEffect(() => {
    getTalents()
      .then(res => res.json())
      .then(res => setTalents(res))
  }, [])

  // const renderItems = (type: boolean, data: ) => {
  //   return (
  //     <>

  //     </>
  //   )
  // }

  return (
    <div className="ideaAndTalent">
      {/* {renderItems(type)} */}
      {/* {type ? <Idea myIdea={false}/> : <Talant />}
      {type ? <Idea myIdea={false}/> : <Talant />} */}

      {type ? <ButtonMoreLoading text={'ідей'}/> : <ButtonMoreLoading text={'талантів'}/>}
    </div>
  );
};

export default IdeasAndTalent;
