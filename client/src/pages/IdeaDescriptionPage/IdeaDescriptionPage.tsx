import { useLocation } from 'react-router-dom'
import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import { IdeaRespType } from '../../types/types'

import './IdeaDescriptionPage.scss'
import { useEffect } from 'react'
import ServiceBanyak from '../../service/ServiceBanyak'
import { hostname } from '../../constants/URLs'

const IdeaDescriptionPage = (isIdea: { isIdea: boolean }) => {
  const location = useLocation()
  const state = location.state as IdeaRespType | undefined

  useEffect(() => {
    // this function only adds idea's views. In layout displays data which sended to component with props (state in Link)
    const addIdeaViews = async () => {
      try {
        const response = await fetch(
          `${hostname}/api/v1/ideas/ideas/${state?.slug}`
        )
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }
        const ideaInfo = await response.json()
        return ideaInfo
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.stack)
          throw error
        } else {
          console.error('An unknown error occurred:', error)
        }

        return null
      }
    }

    addIdeaViews()
  }, [])

  return (
    <div className="idea-description-page-wrapper">
      <ButtonBack />
      <IdeaDescriptionPageMobile ideaInfo={state} isIdea={isIdea} />
      <IdeaDescriptionPageTablet ideaInfo={state} isIdea={isIdea} />
      <IdeaDescriptionPageDesktop ideaInfo={state} isIdea={isIdea} />
    </div>
  )
}

export default IdeaDescriptionPage
