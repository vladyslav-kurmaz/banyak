
import SwitchToogle from "../../atoms/SwitchToggle/SwitchToggle";
import logo from "../../image/logo/small_logo.webp";

import "./ProfilePersonalInfo.scss";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

import chat from '../../image/header/chat.svg';
import lampIcon from '../../image/icon/idea.svg';
import plusIcon from '../../image/icon/PLUS.svg';
import { Link } from "react-router-dom";

const ProfilePersonalInfo = () => {
  // const [name, setName] = useState(true);
  // const [nameWrite, setNameWrite] = useState("Катерина Білокур");

  // const inputRef = useRef(null);

  return (
    <div className="personal-info">
      <div className="personal-info__user-profile">
        <SwitchToogle prop1="Я власник ідеї" prop2="Я талант" />
      </div>

      <div className="personal-info__main-info">
        <img src={logo} className="personal-info__avatar" alt="User avatar" />
        

        <div className="personal-info__container">
          <label
            htmlFor="avatar-change"
            className="personal-info__changed-avatar"
          >
            Замінити фото
            <input className="personal-info__input" type="file" id="avatar-change" />
          </label>
          <span className="personal-info__name">Катерина Білокур</span>
          <span className="personal-info__email">mail@gmail.com</span>


        </div>

        <div className="personal-info__statuses">
          <div className="personal-info__statuses-container">
            <label
              htmlFor="vpo"
              className="personal-info__special-status"
            >
              Статус ВПО
              <input className="personal-info__input" type="file" id="vpo" />
            </label>
          </div>
       
          <div className="personal-info__statuses-container">
            <label
              htmlFor="soldie"
              className="personal-info__special-status"
            >
              Статус Військовий
              <input className="personal-info__input" type="file" id="soldier" />
            </label>
          </div>
         
        </div>


        <div className="personal-info__buttons">
          <div className="personal-info__button-outside personal-info__chat">
            <ButtonSmall text="Чат" icon={chat}/>
          </div>
          
          <div className="personal-info__button-outside personal-info__my-idea">
            <ButtonSmall text="Мої ідеї" icon={lampIcon}/>
          </div>
          <div className="personal-info__button-outside personal-info__add-idea">
            <Link to={'/create-idea'} >
              <ButtonSmall text="Додати ідею" icon={plusIcon}/>
            </Link>
            
          </div>
        </div>
      

        
      </div>
    </div>
  );
};

export default ProfilePersonalInfo;
