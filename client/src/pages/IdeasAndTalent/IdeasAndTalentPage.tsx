import { useEffect, useState } from 'react'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'

import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'

import ButtonMoreLoading from '../../atoms/ButtonMoreLoading/ButtonMoreLoading'
import Idea from '../../components/Idea/Idea'
import Talent from '../../components/Talent/Talent'
import { IdeaRespType, TalentRespType } from '../../types/types'

import SearchBySpecialty from '../../atoms/SearchBySpecialty/SearchBySpecialty'
import SearchByStack from '../../atoms/SearchByStack/SearchByStack'

import './IdeasAndTalent.scss'
import { selectSerchBySpecialty } from '../../store/serchBySpecialtySlice'

// lesson 345 to add filtered ideas or talents

const IdeasAndTalent = ({ isIdea }: { isIdea: boolean }) => {
  // console.log('render IdeasAndTalent')
  const [talents, setTalents] = useState<TalentRespType[]>([])
  const [ideas, setIdeas] = useState<IdeaRespType[]>([])

  const { getTalents, getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()

  // add selectedSpecialtyForSearch to getTalents() or getIdeas() props and setIdeas or setTalents acording to response

  // useEffect(() =>{}, []) wrap selectedSpecialtyForSearch
  const selectedSpecialtyForSearch = useAppSelector(selectSerchBySpecialty)
  console.log('selectedSpecialtyForSearch', selectedSpecialtyForSearch)

  useEffect(() => {
    if (isIdea) {
      const fetchIdeas = async () => {
        try {
          const ideas = await getIdeas()
          if (ideas) {
            setIdeas(ideas.results)
            dispatch(changreMainPreloader(false))
          }
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

      fetchIdeas()
    } else {
      const fetchTalents = async () => {
        try {
          const ideas = await getTalents()
          if (ideas) {
            setTalents(ideas.results)
            dispatch(changreMainPreloader(false))
          }
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

      fetchTalents()
    }
    // eslint-disable-next-line
  }, [isIdea])

  // console.log('ideas', ideas)
  // console.log('talents', talents)

  return (
    <div className="ideaAndTalent">
      <div className="ideaAndTalent__search-wraper">
        <SearchByStack />
        <SearchBySpecialty />
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
