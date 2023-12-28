import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'

import './IdeaDescriptionPage.scss'

const IdeaDescriptionPage = () => {
  return (
    <div className="idea-description-page-wraper">
      <ButtonBack />
      <IdeaDescriptionPageMobile />
      <IdeaDescriptionPageTablet />
      <IdeaDescriptionPageDesktop />
    </div>
  )
}

export default IdeaDescriptionPage
