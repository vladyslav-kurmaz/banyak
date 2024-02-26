import { Link } from 'react-router-dom'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import QuestionMark from '../../atoms/QuestionMark/QuestionMark'
import plugIcon from '../../image/logo/small_logo.webp'
import { IdeaRespType, TalentRespType } from '../../types/types'
import useUUID from '../../hooks/useUUID'

import './IdeaDescriptionPageDesktop.scss'

function IdeaDescriptionPageDesktop({
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
    <div className="idea-description">
      <div className="idea-description__logo-specialities-question-wraper">
        <div className="idea-description__logo-specialities-wraper">
          <img
            // src={ideaInfo.avatar ? ideaInfo.avatar : plugIcon}
            src={plugIcon}
            alt="logo for idea"
            className="idea-description__img"
          />
          {isIdea ? (
            <div className="idea-description__specialities">
              <h4 className="idea-description__specialities-title">
                Потрібні фахівці:
              </h4>
              <ul>
                {ideaInfo?.specialization.map((speciality, index) => (
                  <li
                    key={ideaSpecializationKeys[index]}
                    className="idea-description__specialities-item"
                  >
                    {speciality.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="idea-description__specialities">
              <h4 className="idea-description__specialities-title">
                {`${talentInfo?.user.first_name} ${talentInfo?.user.last_name}`}
              </h4>
              <Link
                className="talent-description__portfolio-btn"
                to={`${talentInfo?.portfolio}`}
              >
                Портфоліо
              </Link>
            </div>
          )}
        </div>
        <div className="idea-description__question-mark">
          <QuestionMark />
        </div>
      </div>
      <div className="idea-description__info">
        {isIdea ? (
          <div className="idea-description__info-title-description-wraper">
            <h1 className="idea-description__info-title">{ideaInfo?.title}</h1>
            <p className="idea-description__info-description">
              {ideaInfo?.description}
            </p>
          </div>
        ) : (
          <div className="idea-description__info-title-description-wraper">
            <h1 className="idea-description__info-title">
              {talentInfo?.speciality[0].name}
            </h1>
            <p className="idea-description__info-description">
              {talentInfo?.description}
            </p>
          </div>
        )}
        <div className="idea-description__info-stack-btn-wraper">
          <div className="idea-description__info-stack">
            <h4 className="idea-description__info-stack-title">
              {isIdea ? 'Потрібні технології:' : 'Володію технологіями:'}
            </h4>
            {isIdea ? (
              <ul className="idea-description__info-stack-items-wraper">
                {ideaInfo?.stack.map((technology, index) => (
                  <li
                    key={ideaStackKeys[index]}
                    className="idea-description__info-stack-item"
                  >
                    {`+${technology.name}`}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="idea-description__info-stack-items-wraper">
                {talentInfo?.stack.map((technology, index) => (
                  <li
                    key={talentStackKeys[index]}
                    className="idea-description__info-stack-item"
                  >
                    {`+${technology.name}`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Change route here to chat page */}
          <Link className="idea-description__info-link-btn" to="/">
            {isIdea ? 'Відгукнутися' : "Зв'язатися"}
          </Link>
        </div>
      </div>
      <div className="idea-description__views-date-wraper">
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

export default IdeaDescriptionPageDesktop

// // HTML Template
// <div className="idea-description">
//       <div className="idea-description__logo-specialities-question-wraper">
//         <div className="idea-description__logo-specialities-wraper">
//           <img
//             src={plugIcon}
//             alt="logo for idea"
//             className="idea-description__img"
//           />
//           <div className="idea-description__specialities">
//             <h4 className="idea-description__specialities-title">
//               Потрібні фахівці:
//             </h4>
//             <div className="idea-description__specialities-wraper">
//               <p className="idea-description__specialities-item">
//                 UI/UX Designer
//               </p>
//               <p className="idea-description__specialities-item">
//                 Frontend Developer
//               </p>
//               <p className="idea-description__specialities-item">
//                 Backend Developer
//               </p>
//               <p className="idea-description__specialities-item">
//                 Frontend Developer
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="idea-description__question-mark">
//           <QuestionMark />
//         </div>
//       </div>
//       <div className="idea-description__info">
//         <div className="idea-description__info-title-description-wraper">
//           <h1 className="idea-description__info-title">
//             Мобільний застосунок для домогосподарок
//           </h1>
//           <p className="idea-description__info-description">
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
//         <div className="idea-description__info-stack-btn-wraper">
//           <div className="idea-description__info-stack">
//             <h4 className="idea-description__info-stack-title">
//               Потрібні технології:
//             </h4>
//             <div className="idea-description__info-stack-items-wraper">
//               <p className="idea-description__info-stack-item">+Figma</p>
//               <p className="idea-description__info-stack-item">+A/B testing</p>
//               <p className="idea-description__info-stack-item">
//                 +Adobe ILLustrator
//               </p>
//               <p className="idea-description__info-stack-item">React Native</p>
//               <p className="idea-description__info-stack-item">Type Script</p>
//             </div>
//           </div>

//           <Link className="idea-description__info-link-btn" to="/">
//             Відгукнутися
//           </Link>
//         </div>
//       </div>
//       <div className="idea-description__views-date-wraper">
//         <ViewsIconAndQuantity viewsQuantity={10} />
//         <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
//       </div>
//     </div>
