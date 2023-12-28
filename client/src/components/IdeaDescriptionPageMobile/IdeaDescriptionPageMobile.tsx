import { Link } from 'react-router-dom'
import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import QuestionMark from '../../atoms/QuestionMark/QuestionMark'
import plugIcon from '../../image/logo/small_logo.webp'

import './IdeaDescriptionPageMobile.scss'

function IdeaDescriptionPageMobile() {
  return (
    <div className="mobile-idea-description">
      <div className="mobile-idea-description__content-wraper">
        <div className="mobile-idea-description__header">
          <img
            src={plugIcon}
            alt="logo for idea"
            className="mobile-idea-description__header-img"
          />
          <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
          <ViewsIconAndQuantity viewsQuantity={10} />
        </div>
        <div className="mobile-idea-description__info">
          <h1 className="mobile-idea-description__info-title">
            Мобільний застосунок для домогосподарок
          </h1>
          <p className="mobile-idea-description__info-description">
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
        <div className="mobile-idea-description__stack">
          <h4 className="mobile-idea-description__stack-title">
            Потрібні технології:
          </h4>
          <div className="mobile-idea-description__stack-items-wraper">
            <p className="mobile-idea-description__stack-item">+Figma</p>
            <p className="mobile-idea-description__stack-item">+A/B testing</p>
            <p className="mobile-idea-description__stack-item">
              +Adobe ILLustrator
            </p>
            <p className="mobile-idea-description__stack-item">React Native</p>
            <p className="mobile-idea-description__stack-item">Type Script</p>
          </div>
        </div>
        <div className="mobile-idea-description__specialities">
          <h4 className="mobile-idea-description__specialities-title">
            Потрібні фахівці:
          </h4>
          <div className="mobile-idea-description__specialities-wraper">
            <p className="mobile-idea-description__specialities-item">
              UI/UX Designer
            </p>
            <p className="mobile-idea-description__specialities-item">
              Frontend Developer
            </p>
            <p className="mobile-idea-description__specialities-item">
              Backend Developer
            </p>
            <p className="mobile-idea-description__specialities-item">
              Frontend Developer
            </p>
          </div>
        </div>
        <div className="mobile-idea-description__btn-wraper">
          <Link className="mobile-idea-description__btn-wraper-link-btn" to="/">
            Відгукнутися
          </Link>
          <div className="mobile-idea-description___question-mark">
            <QuestionMark />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaDescriptionPageMobile
