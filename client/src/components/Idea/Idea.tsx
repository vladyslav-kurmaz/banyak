import { v4 as uuidv4 } from 'uuid'
import plugIcon from '../../image/logo/small_logo.webp'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import { IdeaRespType } from '../../types/types'
import makesTextShorterAddsDots from '../../utils/makesTextShorterAddsDots'
import { Link } from 'react-router-dom'

import './Idea.scss'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'

const IDEA_TITLE_LENGTH = 24
const IDEA_DESCRIPTION_LENGTH = 90
const SPECIALITY_NAME_LENGTH = 12

const Idea = ({ myIdea, idea }: { myIdea: boolean; idea: IdeaRespType }) => {
  const data = ['Frontend developer', 'Backend developer', 'Backend developer']

  const renderSpeciality = (specialitys: { name: string }[]) => {
    return specialitys.map((speciality, i) => {
      if (i < 2) {
        return (
          <li key={uuidv4()} className="idea__container-specialty-item">
            <span className="idea__container-specialty-item-status "></span>
            <span className="idea__container-specialty-item-text">
              {makesTextShorterAddsDots(
                speciality.name,
                SPECIALITY_NAME_LENGTH
              )}
            </span>
          </li>
        )
      } else {
        return ''
      }
    })
  }

  const renderStack = (stack: { name: string }[]) => {
    if (stack.length > 4) {
      return stack.map((technology, i) =>
        i < 4 ? (
          <span
            className="idea__container-info-stack-item"
            key={uuidv4()}
          >{`+${technology.name}`}</span>
        ) : (
          ''
        )
      )
    } else if (stack.length < 4 && stack.length > 0) {
      return stack.map((technology) => (
        <span
          className="idea__container-info-stack-item"
          key={uuidv4()}
        >{`+${technology.name}`}</span>
      ))
    } else {
      return ''
    }
  }

  const allSpeciality =
    idea.specialization.length > 2 ? (
      <li className="idea__container-specialty-item all-specialty">
        <span className="idea__container-specialty-item-status"></span>
        <span className="idea__container-specialty-item-text">{`+${
          idea.specialization.length - 2
        }`}</span>
      </li>
    ) : null

  return (
    <div className="idea">
      <div className="idea__container">
        <div className="idea__img">
          <img
            src={plugIcon}
            alt="logo for idea"
            className="idea__img-picture"
          />
        </div>
        <div className="idea__info-and-speciality-wraper ">
          <div className="idea__container-info">
            <h2 className="idea__container-info-title">
              {makesTextShorterAddsDots(idea.title, IDEA_TITLE_LENGTH)}
            </h2>
            <p className="idea__container-info-description">
              {makesTextShorterAddsDots(
                idea.description,
                IDEA_DESCRIPTION_LENGTH
              )}
            </p>
            <div className="idea__container-info-stack">
              {renderStack(idea.stack)}
            </div>
          </div>

          <ul className="idea__container-specialty">
            {renderSpeciality(idea.specialization)}
            {allSpeciality}
          </ul>
        </div>
      </div>

      <div className="idea__metric">
        <div>
          {myIdea ? null : (
            <Link to={`${idea.slug}`} className="idea__metric-button">
              Детальніше
            </Link>
          )}
        </div>

        <div className="idea__metric-metrics">
          <ViewsIconAndQuantity viewsQuantity={10} />
          <DisplayDateFromDB date={idea.updated_at} />
        </div>
      </div>
    </div>
  )
}
/* *******Tmplate for Idea component*******
<>
<div className="idea">
  <div className="idea__img">
    <img src={plugIcon} alt="" className="idea__img-picture" />
  </div>

  <div className="idea__container">
    <div className="idea__container-info">
      <h2 className="idea__container-info-title">Сайт Арт-платформа</h2>
      <p className="idea__container-info-description">
        Шукаю бажаючих долучитись до розробки ідеї арт-сайту.
      </p>
    </div>

    <ul className="idea__container-specialty">
      {renderSpeciality(idea.specialization)}
      {allSpeciality}
    </ul>
  </div>

  <div className="idea__metric">
    <div className="idea__metric-button">
      {myIdea ? null : <ButtonSmall text="Долучитись" />}
    </div>

    <div className="idea__metric-metrics">
      <div className="idea__metric-metrics-view">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#061730"
          />
        </svg>
        <span className="idea__metric-metrics-view-total">5</span>
      </div>
      <div className="idea__metric-metrics-data">13.07.2023</div>
    </div>
  </div>
</div>
</> */

export default Idea
