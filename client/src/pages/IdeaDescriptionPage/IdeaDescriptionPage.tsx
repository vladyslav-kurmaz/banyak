import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'

import './IdeaDescriptionPage.scss'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'

const IdeaDescriptionPage = () => {
  return (
    <>
      <IdeaDescriptionPageMobile />
      <IdeaDescriptionPageTablet />
      <IdeaDescriptionPageDesktop />
    </>
  )
}

export default IdeaDescriptionPage
