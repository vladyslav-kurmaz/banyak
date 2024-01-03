import { Link } from 'react-router-dom'
import plugIcon from '../../image/logo/small_logo.webp'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import { TalentRespType } from '../../types/types'
import makesTextShorterAddsDots from '../../utils/makesTextShorterAddsDots'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'

import './Talent.scss'

const TALENT_TITLE_LENGTH = 30
const TALENT_DESCRIPTION_LENGTH = 60
const TALENT_STACK_ITEM_LENGTH = 8

const Talent = ({ talentInfo }: { talentInfo: TalentRespType }) => {
  const renderStack = (data: { name: string }[]) => {
    return data.map((item, i) => {
      const itemLengh =
        item.name.length < 18
          ? `+${makesTextShorterAddsDots(item.name, TALENT_STACK_ITEM_LENGTH)}`
          : `+${makesTextShorterAddsDots(
              item.name,
              TALENT_STACK_ITEM_LENGTH
            )}...`
      if (i < 3) {
        return (
          <li className="talant__container-technologies-item">
            <span className="talant__container-technologies-item-teh">
              {itemLengh}
            </span>
          </li>
        )
      } else {
        return ''
      }
    })
  }

  const allStack =
    talentInfo.stack.length > 3 ? (
      <li className="talant__container-technologies-item all-technologies">
        ...
      </li>
    ) : null

  return (
    <div className="talant">
      <div className="talant__img">
        <img
          src={plugIcon}
          alt="talant avatar"
          className="talant__img-picture"
        />
      </div>

      <div className="talant__container">
        <div className="talant__container-info">
          <h2 className="talant__container-info-title">
            {makesTextShorterAddsDots(
              talentInfo.speciality[0]?.name,
              TALENT_TITLE_LENGTH
            )}
          </h2>
          <p className="talant__container-info-description">
            {makesTextShorterAddsDots(
              talentInfo.description,
              TALENT_DESCRIPTION_LENGTH
            )}
          </p>
          <div className="talant__container-button">
            <ButtonSmall
              text="Портфоліо"
              style={{
                'padding-bottom': '2px',
                'padding-top': '2px',
                'font-size': '15px',
              }}
              href={talentInfo.portfolio}
            />
          </div>
        </div>
        <ul className="talant__container-technologies">
          {renderStack(talentInfo.stack)}
          {allStack}
        </ul>
      </div>

      <div className="talant__button">
        <Link
          to={`${talentInfo.slug}`}
          state={{ ...talentInfo }}
          className="buttonSmall"
        >
          Детальніше
        </Link>
      </div>
      <div className="talant__metrics">
        <ViewsIconAndQuantity viewsQuantity={talentInfo.profile_view} />
        <DisplayDateFromDB date={talentInfo.updated_at} />
      </div>
    </div>
  )
}

export default Talent
