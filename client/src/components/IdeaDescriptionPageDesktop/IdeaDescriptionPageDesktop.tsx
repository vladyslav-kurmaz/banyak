import { Link } from 'react-router-dom'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import QuestionMark from '../../atoms/QuestionMark/QuestionMark'
import plugIcon from '../../image/logo/small_logo.webp'

import './IdeaDescriptionPageDesktop.scss'

function IdeaDescriptionPageDesktop() {
  return (
    <div className="idea-description">
      <div className="idea-description__logo-specialities-question-wraper">
        <div className="idea-description__logo-specialities-wraper">
          <img
            src={plugIcon}
            alt="logo for idea"
            className="idea-description__img"
          />
          <div className="idea-description__specialities">
            <h4 className="idea-description__specialities-title">
              Потрібні фахівці:
            </h4>
            <div className="idea-description__specialities-wraper">
              <p className="idea-description__specialities-item">
                UI/UX Designer
              </p>
              <p className="idea-description__specialities-item">
                Frontend Developer
              </p>
              <p className="idea-description__specialities-item">
                Backend Developer
              </p>
              <p className="idea-description__specialities-item">
                Frontend Developer
              </p>
            </div>
          </div>
        </div>
        <div className="idea-description__question-mark">
          <QuestionMark />
        </div>
      </div>
      <div className="idea-description__info">
        <div className="idea-description__info-title-description-wraper">
          <h1 className="idea-description__info-title">
            Мобільний застосунок для домогосподарок
          </h1>
          <p className="idea-description__info-description">
            Шукаю UI/UX дизайнера щоб розробити мобільний застосунок, для
            домогосподарок, під ios платформу. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Architecto vel, quasi exercitationem
            provident suscipit, maiores, molestias odio dolor officiis
            blanditiis delectus dolores a expedita earum labore sapiente harum
            accusamus! Modi, aliquam itaque amet dolor vitae doloribus! Nisi,
            optio numquam voluptatem consequatur officia hic illum in! Dolore
            aperiam voluptas praesentium nesciunt.
          </p>
        </div>
        <div className="idea-description__info-stack-btn-wraper">
          <div className="idea-description__info-stack">
            <h4 className="idea-description__info-stack-title">
              Потрібні технології:
            </h4>
            <div className="idea-description__info-stack-items-wraper">
              <p className="idea-description__info-stack-item">+Figma</p>
              <p className="idea-description__info-stack-item">+A/B testing</p>
              <p className="idea-description__info-stack-item">
                +Adobe ILLustrator
              </p>
              <p className="idea-description__info-stack-item">React Native</p>
              <p className="idea-description__info-stack-item">Type Script</p>
            </div>
          </div>

          <Link className="idea-description__info-link-btn" to="/">
            Відгукнутися
          </Link>
        </div>
      </div>
      <div className="idea-description__views-date-wraper">
        <ViewsIconAndQuantity viewsQuantity={10} />
        <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
      </div>
    </div>
  )
}

export default IdeaDescriptionPageDesktop
