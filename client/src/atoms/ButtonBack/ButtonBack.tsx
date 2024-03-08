import { useNavigate } from 'react-router-dom'

import './ButtonBack.scss'

const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button type="button" className="button__back" onClick={() => navigate(-1)}>
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
  )
}

export default ButtonBack
