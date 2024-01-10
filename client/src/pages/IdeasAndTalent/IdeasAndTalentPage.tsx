import { useEffect, useState } from 'react'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch } from '../../hooks/reduxToolkidHooks'

import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'

import ButtonMoreLoading from '../../atoms/ButtonMoreLoading/ButtonMoreLoading'
import Idea from '../../components/Idea/Idea'
import Talent from '../../components/Talent/Talent'
import {
  IdeaRespType,
  TalentRespType,
  ServerResForTalents,
  ServerResForIdeas,
} from '../../types/types'

import SearchForSpecialty from '../../atoms/SearchForSpecialty/SearchForSpecialty'
import SearchForStack from '../../atoms/SearchForStak/SearchForStack'

import './IdeasAndTalent.scss'

// lesson 345 to add filtered ideas or talents

const IdeasAndTalent = ({ isIdea }: { isIdea: boolean }) => {
  // console.log('render IdeasAndTalent')
  const [talents, setTalents] = useState<TalentRespType[]>([])
  const [ideas, setIdeas] = useState<IdeaRespType[]>([])

  const { getTalents, getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isIdea) {
      getIdeas()
        .then((res) => res.json() as Promise<ServerResForIdeas>)
        .then((ideasData) => ideasData.results)
        .then((ideasList) => setIdeas(ideasList))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch((e) => {
          console.error(e.message)
          dispatch(changreMainPreloader(false))
        })
    } else {
      getTalents()
        .then((res) => res.json() as Promise<ServerResForTalents>)
        .then((talentsData) => talentsData.results)
        .then((talentsList) => setTalents(talentsList))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch((e) => {
          console.error(e.message)
          dispatch(changreMainPreloader(false))
        })
    }
    // eslint-disable-next-line
  }, [isIdea])

  // console.log('ideas', ideas)
  // console.log('talents', talents)

  return (
    <div className="ideaAndTalent">
      <div className="ideaAndTalent__search-wraper">
        <SearchForStack />
        <SearchForSpecialty />
      </div>
      {isIdea
        ? ideas.map((ideaItem) => (
            <Idea key={ideaItem.id} myIdea={false} idea={ideaItem} />
          ))
        : talents.map((talentItem) => (
            <Talent key={talentItem.id} talentInfo={talentItem} />
          ))}

      {isIdea ? (
        <ButtonMoreLoading text={'ідей'} />
      ) : (
        <ButtonMoreLoading text={'талантів'} />
      )}
    </div>
  )
}

export default IdeasAndTalent
