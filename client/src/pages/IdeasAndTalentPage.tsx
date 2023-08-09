import Idea from "../components/Idea/Idea";
import Talant from "../components/Talant/Talant";

const IdeasAndTalent = ({type}: {type: boolean}) => {
  return (
    <>
        {type ? <Idea/> : <Talant/>}
    </>
  )
}

export default IdeasAndTalent;