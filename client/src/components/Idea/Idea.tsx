import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import plugIcon from '../../image/logo/small_logo.webp'
import { IdeaRespType } from '../../types/types'
import makesTextShorterAddsDots from '../../utils/makesTextShorterAddsDots'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import RenderStack from '../../atoms/RenderStack/RenderStack'

import './Idea.scss'

const IDEA_TITLE_LENGTH = 24
const IDEA_DESCRIPTION_LENGTH = 90
const SPECIALITY_NAME_LENGTH = 12
const STACK_ITEMS_QUANTITY = 4

const Idea = ({ myIdea, idea }: { myIdea: boolean; idea: IdeaRespType }) => {
  const renderSpeciality = (specialities: { name: string }[]) => {
    return specialities.map((speciality, i) => {
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
    <>
      {/* Desctop version */}
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
                <RenderStack
                  stack={idea.stack}
                  stackItemsQuantity={STACK_ITEMS_QUANTITY}
                />
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
              <Link
                to={`${idea.slug}`}
                state={{ ...idea }}
                className="idea__metric-button"
              >
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

      {/* Mobile version */}
      <div className="idea-mobile">
        <div className="idea-mobile__img">
          <img
            src={plugIcon}
            alt="logo for idea-mobile"
            className="idea-mobile__img-picture"
          />
          <DisplayDateFromDB date={idea.updated_at} />

          <ViewsIconAndQuantity viewsQuantity={10} />
        </div>
        <div className="idea-mobile__container">
          <div className="idea-mobile__container-info">
            <h2 className="idea-mobile__container-info-title">
              {makesTextShorterAddsDots(idea.title, IDEA_TITLE_LENGTH)}
            </h2>
            <p className="idea-mobile__container-info-description">
              {makesTextShorterAddsDots(
                idea.description,
                IDEA_DESCRIPTION_LENGTH
              )}
            </p>
            <div className="idea-mobile__container-info-stack">
              <RenderStack stack={idea.stack} />
            </div>
          </div>

          <ul className="idea-mobile__container-specialty">
            {renderSpeciality(idea.specialization)}
            {allSpeciality}
          </ul>
        </div>

        <div className="idea-mobile__metric">
          <div>
            {myIdea ? null : (
              <Link
                to={`${idea.slug}`}
                state={{ ...idea }}
                className="idea-mobile__metric-button"
              >
                Детальніше
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Idea
