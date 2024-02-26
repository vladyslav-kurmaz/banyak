import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import QuestionMark from '../../atoms/QuestionMark/QuestionMark'
import plugIcon from '../../image/logo/small_logo.webp'
import { IdeaRespType, TalentRespType } from '../../types/types'

import './IdeaDescriptionPageTablet.scss'
import useUUID from '../../hooks/useUUID'

function IdeaDescriptionPageTablet({
  isIdea,
  ideaInfo,
  talentInfo,
}: {
  isIdea?: { isIdea: boolean }
  ideaInfo?: IdeaRespType
  talentInfo?: TalentRespType
}) {
  const ideaSpecializationKeys = useUUID(ideaInfo?.specialization.length)
  const ideaStackKeys = useUUID(ideaInfo?.stack.length)
  const talentStackKeys = useUUID(talentInfo?.stack.length)
  return (
    <div className="tablet-idea-description">
      {isIdea ? (
        <div className="tablet-idea-description__logo-title">
          <img
            src={plugIcon}
            alt="logo for idea"
            className="tablet-idea-description__img"
          />
          <h1 className="tablet-idea-description__title">{ideaInfo?.title}</h1>
        </div>
      ) : (
        <div className="tablet-talent-description__name-avatar-portfolio-wraper">
          <img
            src={plugIcon}
            alt="talant's avatar"
            className="tablet-idea-description__img"
          />
          <h4 className="tablet-idea-description__title">{`${talentInfo?.user.first_name} ${talentInfo?.user.last_name}`}</h4>
          <Link
            className="tablet-talent-description__portfolio-btn"
            to={`${talentInfo?.portfolio}`}
          >
            Портфоліо
          </Link>
        </div>
      )}

      {isIdea ? (
        <p className="tablet-idea-description__description">
          {ideaInfo?.description}
        </p>
      ) : (
        <div className="tablet-talent-description__speciality-description-wraper">
          <h1 className="tablet-idea-description__title">
            {talentInfo?.speciality[0].name}
          </h1>
          <p className="tablet-idea-description__description">
            {talentInfo?.description}
          </p>
        </div>
      )}

      <div className="tablet-idea-description__stack">
        <h4 className="tablet-idea-description__stack-title">
          {isIdea ? 'Потрібні технології:' : 'Володію технологіями:'}
        </h4>
        {isIdea ? (
          <ul className="tablet-idea-description__stack-items-wraper">
            {ideaInfo?.stack.map((technology, index) => (
              <li
                key={ideaStackKeys[index]}
                className="tablet-idea-description__stack-item"
              >
                {`+${technology.name}`}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="tablet-idea-description__stack-items-wraper">
            {talentInfo?.stack.map((technology, index) => (
              <li
                key={talentStackKeys[index]}
                className="tablet-idea-description__stack-item"
              >
                {`+${technology.name}`}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="tablet-idea-description__specialities-btn-wraper">
        {isIdea ? (
          <div className="tablet-idea-description__specialities">
            <h4 className="tablet-idea-description__specialities-title">
              Потрібні фахівці:
            </h4>
            <ul className="tablet-idea-description__specialities-items-wraper">
              {ideaInfo?.specialization.map((speciality, index) => (
                <li
                  key={ideaSpecializationKeys[index]}
                  className="tablet-idea-description__specialities-item"
                >
                  {speciality.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {/* Change route here to chat page */}
        <Link className="tablet-idea-description__link-btn" to="/">
          {isIdea ? 'Відгукнутися' : "Зв'язатися"}
        </Link>
      </div>

      <div className="tablet-idea-description__views-date-wraper">
        <QuestionMark />
        <ViewsIconAndQuantity
          viewsQuantity={
            isIdea ? ideaInfo?.idea_views : talentInfo?.profile_view
          }
        />
        <DisplayDateFromDB
          date={isIdea ? ideaInfo?.updated_at : talentInfo?.updated_at}
        />
      </div>
    </div>
  )
}

export default IdeaDescriptionPageTablet

// Template for tablet
{
  /* <div className="tablet-idea-description">
      <div className="tablet-idea-description__logo-title">
        <img
          src={plugIcon}
          alt="logo for idea"
          className="tablet-idea-description__img"
        />
        <h1 className="tablet-idea-description__title">
          Мобільний застосунок для домогосподарок
        </h1>
      </div>
      <p className="tablet-idea-description__description">
        Шукаю UI/UX дизайнера щоб розробити мобільний застосунок, для
        домогосподарок, під ios платформу. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Architecto vel, quasi exercitationem
        provident suscipit, maiores, molestias odio dolor officiis blanditiis
        delectus dolores a expedita earum labore sapiente harum accusamus! Modi,
        aliquam itaque amet dolor vitae doloribus! Nisi, optio numquam
        voluptatem consequatur officia hic illum in! Dolore aperiam voluptas
        praesentium nesciunt.
      </p>
      <div className="tablet-idea-description__stack">
        <h4 className="tablet-idea-description__stack-title">
          Потрібні технології:
        </h4>
        <div className="tablet-idea-description__stack-items-wraper">
          <p className="tablet-idea-description__stack-item">+Figma</p>
          <p className="tablet-idea-description__stack-item">+A/B testing</p>
          <p className="tablet-idea-description__stack-item">
            +Adobe ILLustrator
          </p>
          <p className="tablet-idea-description__stack-item">React Native</p>
          <p className="tablet-idea-description__stack-item">Type Script</p>
        </div>
      </div>
      <div className="tablet-idea-description__specialities-btn-wraper">
        <div className="tablet-idea-description__specialities">
          <h4 className="tablet-idea-description__specialities-title">
            Потрібні фахівці:
          </h4>
          <div className="tablet-idea-description__specialities-items-wraper">
            <p className="tablet-idea-description__specialities-item">
              UI/UX Designer
            </p>
            <p className="tablet-idea-description__specialities-item">
              Frontend Developer
            </p>
            <p className="tablet-idea-description__specialities-item">
              Backend Developer
            </p>
            <p className="tablet-idea-description__specialities-item">
              Frontend Developer
            </p>
          </div>
        </div>

        <Link className="tablet-idea-description__link-btn" to="/">
          Відгукнутися
        </Link>
      </div>

      <div className="tablet-idea-description__views-date-wraper">
        <QuestionMark />
        <ViewsIconAndQuantity viewsQuantity={10} />
        <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
      </div>
    </div> */
}
