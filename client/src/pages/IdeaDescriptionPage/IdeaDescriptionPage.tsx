import { useLocation } from 'react-router-dom'
import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import { IdeaRespType } from '../../types/types'

import './IdeaDescriptionPage.scss'

const IdeaDescriptionPage = (isIdea: { isIdea: boolean }) => {
  const location = useLocation()
  const state = location.state as IdeaRespType | undefined

  return (
    <div className="idea-description-page-wraper">
      <ButtonBack />
      <IdeaDescriptionPageMobile ideaInfo={state} isIdea={isIdea} />
      <IdeaDescriptionPageTablet ideaInfo={state} isIdea={isIdea} />
      <IdeaDescriptionPageDesktop ideaInfo={state} isIdea={isIdea} />
    </div>
  )
}

export default IdeaDescriptionPage
