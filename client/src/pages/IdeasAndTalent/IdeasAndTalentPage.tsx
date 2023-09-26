import ButtonMoreLoading from "../../atoms/ButtonMoreLoading/ButtonMoreLoading";
import Idea from "../../components/Idea/Idea";
import Talant from "../../components/Talant/Talant";

import './IdeasAndTalent.scss';

const IdeasAndTalent = ({ type }: { type: boolean }) => {
  return (
    <div className="ideaAndTalent">
      {type ? <Idea /> : <Talant />}
      {type ? <Idea /> : <Talant />}

      {type ? <ButtonMoreLoading text={'ідей'}/> : <ButtonMoreLoading text={'талантів'}/>}
    </div>
  );
};

export default IdeasAndTalent;
