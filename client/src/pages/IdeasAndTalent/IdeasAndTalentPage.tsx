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
  const [currentPage, setCurrentPage] = useState(1)

  const [disabled, setDisabled] = useState(false)
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

          if (ideasRes?.count && ideasRes?.count < 10) {
            setDisabled(true)
          } else {
            setDisabled(false)
          }

          if (ideasRes?.count && currentPage === 1) {
            // consider to use setNoTalents(!noTalents)
            setNoTalents(false)
            setNoIdeas(false)
            setIdeas(ideasRes.results)
            dispatch(changreMainPreloader(false))
          } else if (
            ideasRes?.next &&
            currentPage > 1 &&
            (selectedSpecialtyForSearch.specialty || stackForSearch.stack)
          ) {
            const moreIdeasRes = await getIdeas(
              selectedSpecialtyForSearch.specialty,
              stackForSearch.stack,
              currentPage
            )
            if (moreIdeasRes?.results.length) {
              setNoTalents(false)
              setNoIdeas(false)
              setIdeas((prevIdeas) => [...prevIdeas, ...moreIdeasRes?.results])
            }
            if (currentPage * ideasRes.results.length >= ideasRes.count) {
              setDisabled(true)
            }
          } else if (
            ideasRes?.count &&
            (selectedSpecialtyForSearch.specialty || stackForSearch.stack)
          ) {
            console.log(
              'test from ideasRes?.count && (selectedSpecialtyForSearch.specialty || stackForSearch.stack)'
            )
            setNoTalents(false)
            setNoIdeas(false)
            setIdeas(ideasRes.results)
            dispatch(changreMainPreloader(false))
          } else if (ideasRes?.next && currentPage > 1) {
            console.log('test from (ideasRes?.next && currentPage > 1)')
            const moreIdeasRes = await getIdeas(
              selectedSpecialtyForSearch.specialty,
              stackForSearch.stack,
              currentPage
            )
            if (moreIdeasRes?.results.length) {
              setNoTalents(false)
              setNoIdeas(false)
              setIdeas((prevIdeas) => [...prevIdeas, ...moreIdeasRes?.results])
            }
            if (currentPage * ideasRes.results.length >= ideasRes.count) {
              setDisabled(true)
            }
          } else {
            console.log('from last else')
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
      // see what talents shows check the level of updates
      const fetchTalents = async () => {
        setNoIdeas(false)
        try {
          const talentsRes = await getTalents(
            selectedSpecialtyForSearch.specialty,
            stackForSearch.stack
          )
          console.log('talentsRes', talentsRes)
          if (talentsRes?.count && talentsRes?.count < 10) {
            setDisabled(true)
          } else {
            setDisabled(false)
          }

          if (talentsRes?.count && currentPage === 1) {
            setNoIdeas(false)
            setNoTalents(false)
            setTalents(talentsRes.results)
            dispatch(changreMainPreloader(false))
          } else if (
            talentsRes?.next &&
            currentPage > 1 &&
            (selectedSpecialtyForSearch.specialty || stackForSearch.stack)
          ) {
            const moreTalentsRes = await getTalents(
              selectedSpecialtyForSearch.specialty,
              stackForSearch.stack,
              currentPage
            )

            if (moreTalentsRes?.results.length) {
              setNoIdeas(false)
              setNoTalents(false)
              setTalents((prevTalents) => [
                ...prevTalents,
                ...moreTalentsRes?.results,
              ])
            }

            if (currentPage * talentsRes.results.length >= talentsRes.count) {
              setDisabled(true)
            }
          } else if (talentsRes?.next && currentPage > 1) {
            const moreTalentsRes = await getTalents(
              selectedSpecialtyForSearch.specialty,
              stackForSearch.stack,
              currentPage
            )

            if (moreTalentsRes?.results.length) {
              setNoIdeas(false)
              setNoTalents(false)
              setTalents((prevTalents) => [
                ...prevTalents,
                ...moreTalentsRes?.results,
              ])
            }

            if (currentPage * talentsRes.results.length >= talentsRes.count) {
              setDisabled(true)
            }
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
  }, [
    isIdea,
    selectedSpecialtyForSearch.specialty,
    stackForSearch.stack,
    currentPage,
  ])

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

      <ButtonMoreLoading
        text={isIdea ? 'ідей' : 'талантів'}
        setCurrentPage={setCurrentPage}
        disabled={disabled}
      />
    </div>
  )
}

export default IdeasAndTalent
