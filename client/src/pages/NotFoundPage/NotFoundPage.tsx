import { useNavigate, Link } from "react-router-dom";
import errorPhoto from "../../image/erroPage/errorPhoto.webp";

import "./NotFoundPage.scss";
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <button className="notFound__back" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M28 8V9.08L17.2941 20L28 30.92V32H17.4118L8 22.64V17.36L17.4118 8H28Z"
            fill="#061730"
          />
        </svg>
        Назад
      </button>
      <div className="notFound__num">404</div>
      <div className="notFound__container">
        <div className="notFound__title">Упс, щось трапилось</div>
        <div className="notFound__description">
          Ми вже працюємо над вирішенням цього питання
        </div>
        <img src={errorPhoto} alt="Error" className="notFound__picture" />
        <Link to={"/"} className="notFound__goMain">
          <ButtonSmall text="Повернутись на головну" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
