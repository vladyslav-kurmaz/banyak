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
import { selectSearchBySpecialty } from '../../store/searchBySpecialtySlice'
import IdeasOrTalentNotFind from '../../atoms/IdeasOrTalentNotFind/IdeasOrTalentNotFind'
import './IdeasAndTalent.scss'
import { selectSerchByStack } from '../../store/searchByStackSlice'

const IdeasAndTalent = ({ isIdea }: { isIdea: boolean }) => {
  const [talents, setTalents] = useState<TalentRespType[]>([])
  const [ideas, setIdeas] = useState<IdeaRespType[]>([])
  const [noIdeas, setNoIdeas] = useState(false)
  const [noTalents, setNoTalents] = useState(false)
  const { getTalents, getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()

  const selectedSpecialtyForSearch = useAppSelector(selectSearchBySpecialty)
  const stackForSearch = useAppSelector(selectSerchByStack)

  useEffect(() => {
    if (isIdea) {
      const fetchIdeas = async () => {
        setNoTalents(false)
        try {
          const ideasRes = await getIdeas(
            selectedSpecialtyForSearch.specialty,
            stackForSearch.stack
          )

          if (ideasRes?.count) {
            setNoTalents(false)
            setNoIdeas(false)
            setIdeas(ideasRes.results)
            dispatch(changreMainPreloader(false))
          } else {
            setIdeas([])
            setNoIdeas(true)
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
        setNoIdeas(false)
        try {
          const talentsRes = await getTalents(
            selectedSpecialtyForSearch.specialty,
            stackForSearch.stack
          )

          console.log(talentsRes)

          if (talentsRes?.count) {
            setNoIdeas(false)
            setNoTalents(false)
            setTalents(talentsRes.results)
            dispatch(changreMainPreloader(false))
          } else {
            setTalents([])
            setNoTalents(true)
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
  }, [isIdea, selectedSpecialtyForSearch, stackForSearch])

  console.log('ideas', ideas)
  // console.log('talents', talents)

  return (
    <div className="ideaAndTalent">
      <div className="ideaAndTalent__search-wraper">
        <SearchByStack />
        <SearchBySpecialty />
      </div>
      {noIdeas ? (
        <IdeasOrTalentNotFind
          searchQuery={
            selectedSpecialtyForSearch.specialty || stackForSearch.stack
          }
          isTalent={false}
        />
      ) : (
        ''
      )}
      {noTalents ? (
        <IdeasOrTalentNotFind
          searchQuery={
            selectedSpecialtyForSearch.specialty || stackForSearch.stack
          }
          isTalent={true}
        />
      ) : (
        ''
      )}

      {isIdea
        ? ideas?.map((ideaItem) => (
            <Idea key={ideaItem.id} myIdea={false} idea={ideaItem} />
          ))
        : talents?.map((talentItem) => (
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
