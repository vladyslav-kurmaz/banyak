import { useEffect } from 'react'
import './ChooseProfilePage.scss'
import ButtonChooseProfile from '../../atoms/ButtonChooseProfile/ButtonChooseProfile'

const ChooseProfilePage = () =>
  //   {
  //   buttonOne,
  //   buttonTwo,
  // }: {
  //   buttonOne: React.ReactNode
  //   buttonTwo: React.ReactNode
  // }
  {
    useEffect(() => {}, [])

    return (
      <div className="choose-profile-page">
        <h1 className="choose-profile-page__title">Я тут щоб</h1>
        <div className="choose-profile-page__container">
          <div className="choose-profile-page__button">
            <ButtonChooseProfile
              text="Опублікувати ідею та знайти фахівців для реалізації проєкта"
              type={false}
            />
          </div>
          <div className="choose-profile-page__button">
            <ButtonChooseProfile
              text="Знайти проєкт для отримання досвіду роботи в IT команді"
              type={true}
            />
          </div>
        </div>
      </div>
    )
  }

export default ChooseProfilePage
