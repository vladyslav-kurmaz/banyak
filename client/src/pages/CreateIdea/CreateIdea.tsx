import ButtonBack from '../../atoms/ButtonBack/ButtonBack';
import logo from '../../image/logo/small_logo.webp';

import './CreateIdea.scss';

const CreateIdea = () => {
  return (
    <div className="create-idea  create-idea__outside">

      <div className="create-idea__button-back">
        <ButtonBack/>
      </div>
      
      <div className="create-idea__inside">

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
          </div>

        </div>



      </div>
    </div>
  )
}

export default CreateIdea;