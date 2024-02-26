import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import QuestionMark from '../../atoms/QuestionMark/QuestionMark'
import plugIcon from '../../image/logo/small_logo.webp'
import { IdeaRespType, TalentRespType } from '../../types/types'
import useUUID from '../../hooks/useUUID'

import './IdeaDescriptionPageMobile.scss'

function IdeaDescriptionPageMobile({
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
    <div className="mobile-idea-description">
      <div className="mobile-idea-description__content-wraper">
        <div className="mobile-idea-description__header">
          <img
            src={plugIcon}
            alt="logo for idea"
            className="mobile-idea-description__header-img"
          />
          <DisplayDateFromDB
            date={isIdea ? ideaInfo?.updated_at : talentInfo?.updated_at}
          />
          <ViewsIconAndQuantity
            viewsQuantity={
              isIdea ? ideaInfo?.idea_views : talentInfo?.profile_view
            }
          />
        </div>
        <div className="mobile-idea-description__info">
          {isIdea ? (
            <h1 className="mobile-idea-description__info-title">
              {ideaInfo?.title}
            </h1>
          ) : (
            <>
              <h4 className="mobile-idea-description__info-title">
                {`${talentInfo?.user.first_name} ${talentInfo?.user.last_name}`}
              </h4>
              <h1 className="mobile-idea-description__info-title">
                {talentInfo?.speciality[0].name}
              </h1>
              <Link
                className="mobile-talent-description__portfolio-btn"
                to={`${talentInfo?.portfolio}`}
              >
                Портфоліо
              </Link>
            </>
          )}

          <p className="mobile-idea-description__info-description">
            {isIdea ? ideaInfo?.description : talentInfo?.description}
          </p>
        </div>
        <div className="mobile-idea-description__stack">
          <h4 className="mobile-idea-description__stack-title">
            {isIdea ? 'Потрібні технології:' : 'Володію технологіями:'}
          </h4>
          {isIdea ? (
            <ul className="mobile-idea-description__stack-items-wraper">
              {ideaInfo?.stack.map((technology, index) => (
                <li
                  key={ideaStackKeys[index]}
                  className="mobile-idea-description__stack-item"
                >
                  {`+${technology.name}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mobile-idea-description__stack-items-wraper">
              {talentInfo?.stack.map((technology, index) => (
                <li
                  key={talentStackKeys[index]}
                  className="mobile-idea-description__stack-item"
                >
                  {`+${technology.name}`}
                </li>
              ))}
            </ul>
          )}
        </div>
        {isIdea ? (
          <div className="mobile-idea-description__specialities">
            <h4 className="mobile-idea-description__specialities-title">
              Потрібні фахівці:
            </h4>
            <ul className="mobile-idea-description__specialities-wraper">
              {ideaInfo?.specialization.map((speciality, index) => (
                <li
                  key={ideaSpecializationKeys[index]}
                  className="mobile-idea-description__specialities-item"
                >
                  {speciality.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
        <div className="mobile-idea-description__btn-wraper">
          {/* Change route here to chat page */}
          {isIdea ? (
            <Link
              className="mobile-idea-description__btn-wraper-link-btn"
              to="/"
            >
              Відгукнутися
            </Link>
          ) : (
            <Link className="mobile-talent-description__connect-btn" to="/">
              Зв’язатись
            </Link>
          )}

          <div className="mobile-idea-description___question-mark">
            <QuestionMark />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaDescriptionPageMobile

// // Template mobile
// <div className="mobile-idea-description">
//       <div className="mobile-idea-description__content-wraper">
//         <div className="mobile-idea-description__header">
//           <img
//             src={plugIcon}
//             alt="logo for idea"
//             className="mobile-idea-description__header-img"
//           />
//           <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
//           <ViewsIconAndQuantity viewsQuantity={10} />
//         </div>
//         <div className="mobile-idea-description__info">
//           <h1 className="mobile-idea-description__info-title">
//             Мобільний застосунок для домогосподарок
//           </h1>
//           <p className="mobile-idea-description__info-description">
//             Шукаю UI/UX дизайнера щоб розробити мобільний застосунок, для
//             домогосподарок, під ios платформу. Lorem ipsum dolor sit amet
//             consectetur adipisicing elit. Architecto vel, quasi exercitationem
//             provident suscipit, maiores, molestias odio dolor officiis
//             blanditiis delectus dolores a expedita earum labore sapiente harum
//             accusamus! Modi, aliquam itaque amet dolor vitae doloribus! Nisi,
//             optio numquam voluptatem consequatur officia hic illum in! Dolore
//             aperiam voluptas praesentium nesciunt.
//           </p>
//         </div>
//         <div className="mobile-idea-description__stack">
//           <h4 className="mobile-idea-description__stack-title">
//             Потрібні технології:
//           </h4>
//           <div className="mobile-idea-description__stack-items-wraper">
//             <p className="mobile-idea-description__stack-item">+Figma</p>
//             <p className="mobile-idea-description__stack-item">+A/B testing</p>
//             <p className="mobile-idea-description__stack-item">
//               +Adobe ILLustrator
//             </p>
//             <p className="mobile-idea-description__stack-item">React Native</p>
//             <p className="mobile-idea-description__stack-item">Type Script</p>
//           </div>
//         </div>
//         <div className="mobile-idea-description__specialities">
//           <h4 className="mobile-idea-description__specialities-title">
//             Потрібні фахівці:
//           </h4>
//           <div className="mobile-idea-description__specialities-wraper">
//             <p className="mobile-idea-description__specialities-item">
//               UI/UX Designer
//             </p>
//             <p className="mobile-idea-description__specialities-item">
//               Frontend Developer
//             </p>
//             <p className="mobile-idea-description__specialities-item">
//               Backend Developer
//             </p>
//             <p className="mobile-idea-description__specialities-item">
//               Frontend Developer
//             </p>
//           </div>
//         </div>
//         <div className="mobile-idea-description__btn-wraper">
//           <Link className="mobile-idea-description__btn-wraper-link-btn" to="/">
//             Відгукнутися
//           </Link>
//           <div className="mobile-idea-description___question-mark">
//             <QuestionMark />
//           </div>
//         </div>
//       </div>
//     </div>
