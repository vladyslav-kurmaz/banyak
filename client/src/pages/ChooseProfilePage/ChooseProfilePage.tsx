
import './ChooseProfilePage.scss';

const ChooseProfilePage = ({buttonOne, buttonTwo}: {buttonOne: React.ReactNode, buttonTwo: React.ReactNode}) => {

  return (
    <div className="choose-profile-page">
      <h1 className="choose-profile-page__title">Я тут щоб</h1>
      <div className="choose-profile-page__container">
        <div className="choose-profile-page__button">
          {buttonOne}
        </div>
        <div className="choose-profile-page__button">
          {buttonTwo}
        </div>
      </div>
    </div>
  )
}

export default ChooseProfilePage;