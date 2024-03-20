import { useEffect } from 'react'
import './ChooseProfilePage.scss'
import ButtonChooseProfile from '../../atoms/ButtonChooseProfile/ButtonChooseProfile'

const ChooseProfilePage = () => {
  return (
    <div className="choose-profile-page">
      <h1 className="choose-profile-page__title">Я тут щоб:</h1>
      <div className="choose-profile-page__container">
        <div className="choose-profile-page__button">
          <ButtonChooseProfile
            text="Опублікувати ідею та знайти фахівців для реалізації проєкту"
            isTalent={false}
          />
        </div>
        <div className="choose-profile-page__button">
          <ButtonChooseProfile
            text="Знайти проєкт для отримання досвіду роботи в IT команді"
            isTalent={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseProfilePage
