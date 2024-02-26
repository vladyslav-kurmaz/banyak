import { useLocation } from 'react-router-dom'
import IdeaDescriptionPageTablet from '../../components/IdeaDescriptionPageTablet/IdeaDescriptionPageTablet'
import IdeaDescriptionPageMobile from '../../components/IdeaDescriptionPageMobile/IdeaDescriptionPageMobile'
import IdeaDescriptionPageDesktop from '../../components/IdeaDescriptionPageDesktop/IdeaDescriptionPageDesktop'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import { TalentRespType } from '../../types/types'

import './IdeaDescriptionPage.scss'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useEffect } from 'react'

function TalentDescriptionPage() {
  const location = useLocation()
  const state = location.state as TalentRespType | undefined
  const { hostname } = ServiceBanyak()

  useEffect(() => {
    // this function only adds talent's views. In layout displays data which sended to component with props (state in Link)

    const addTalentViews = async () => {
      try {
        const response = await fetch(
          `${hostname}/api/v1/talents/talent/${state?.slug}`
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const talentInfo = await response.json()

        return talentInfo
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

    addTalentViews()
  }, [])

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
