import { Link } from 'react-router-dom'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import errorPhoto from '../../image/errorPage/errorPhoto.webp'

import './NotFoundPage.scss'

const NotFoundPage = () => {
  return (
    <div className="notFound">
      <ButtonBack />
      <div className="notFound__num">404</div>
      <div className="notFound__container">
        <div className="notFound__title">Упс, щось трапилось</div>
        <div className="notFound__description">
          Ми вже працюємо над вирішенням цього питання
        </div>
        <img src={errorPhoto} alt="Error" className="notFound__picture" />
        <Link to={'/'} className="notFound__goMain">
          <ButtonSmall
            style={{ 'font-size': '20px' }}
            text="Повернутись на головну"
          />
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
