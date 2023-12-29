import { useLocation } from 'react-router-dom'
import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'

import './IdeaDescriptionPage.scss'

const IdeaDescriptionPage = () => {
  let { state } = useLocation()
  return (
    <div className="idea-description-page-wraper">
      <ButtonBack />
      <IdeaDescriptionPageMobile ideaInfo={state} />
      <IdeaDescriptionPageTablet ideaInfo={state} />
      <IdeaDescriptionPageDesktop ideaInfo={state} />
    </div>
  )
}

export default IdeaDescriptionPage
