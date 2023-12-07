import { useEffect, useState } from 'react'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch } from '../../hooks/reduxToolkidHooks'

import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'

import ButtonMoreLoading from '../../atoms/ButtonMoreLoading/ButtonMoreLoading'
import Idea from '../../components/Idea/Idea'
import Talent from '../../components/Talent/Talent'
import { IdeaRespType, TalentRespType } from '../../types/types'

import './IdeasAndTalent.scss'

// ideaType -> change to isIdea
const IdeasAndTalent = ({ ideaType }: { ideaType: boolean }) => {
  const [talents, setTalents] = useState<TalentRespType[]>([])
  const [ideas, setIdeas] = useState<IdeaRespType[]>([])

  const { getTalents, getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ideaType) {
      getIdeas()
        .then((res) => res.json())
        // .then((ideasData) => ideasData.results) => uncomment after adding pagination
        .then((ideasList) => setIdeas(ideasList))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch(() => dispatch(changreMainPreloader(false)))
    } else {
      getTalents()
        .then((res) => res.json())
        .then((talantsData) => talantsData.results)
        .then((talentsList) => setTalents(talentsList))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch(() => dispatch(changreMainPreloader(false)))
    }
  }, [ideaType])

  console.log('ideas', ideas)
  console.log('talents', talents)

  return (
    <div className="ideaAndTalent">
      {ideaType
        ? ideas.map((ideaItem) => (
            <Idea key={ideaItem.id} myIdea={false} idea={ideaItem} />
          ))
        : talents.map((talentItem) => (
            <Talent key={talentItem.id} talantInfo={talentItem} />
          ))}

      {ideaType ? (
        <ButtonMoreLoading text={'ідей'} />
      ) : (
        <ButtonMoreLoading text={'талантів'} />
      )}
    </div>
  )
}

export default IdeasAndTalent
