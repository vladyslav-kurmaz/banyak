import { useLocation } from 'react-router-dom'

import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import { TalentRespType } from '../../types/types'

import './IdeaDescriptionPage.scss'

function TalentDescriptionPage() {
  const location = useLocation()
  const state = location.state as TalentRespType | undefined

  return (
    <div className="idea-description-page-wraper">
      <ButtonBack />
      <IdeaDescriptionPageMobile talentInfo={state} />
      <IdeaDescriptionPageTablet talentInfo={state} />
      <IdeaDescriptionPageDesktop talentInfo={state} />
    </div>
  )
}
export default TalentDescriptionPage
