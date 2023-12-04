import { useEffect, useState } from 'react'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch } from '../../hooks/reduxToolkidHooks'

import { Talent } from '../../types/types'
import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'

import ButtonMoreLoading from '../../atoms/ButtonMoreLoading/ButtonMoreLoading'
import Idea from '../../components/Idea/Idea'
import Talant from '../../components/Talant/Talant'

import './IdeasAndTalent.scss'

const IdeasAndTalent = ({ ideaType }: { ideaType: boolean }) => {
  const [talents, setTalents] = useState<Talent[]>([])
  const [ideas, setIdeas] = useState<Talent[]>([])

  const { getTalents, getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ideaType) {
      getIdeas()
        .then((res) => res.json())
        .then((res) => setIdeas(res))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch(() => dispatch(changreMainPreloader(false)))
    } else {
      getTalents()
        .then((res) => res.json())
        .then((res) => setTalents(res))
        .then(() => dispatch(changreMainPreloader(false)))
        .catch(() => dispatch(changreMainPreloader(false)))
    }
  }, [ideaType])

  console.log('ideas', ideas)
  const renderItems = (type: boolean, data: Talent[]) => {
    return data.map((item) => {
      return <>{type ? <Idea myIdea={false} /> : <Talant dataUser={item} />}</>
    })
  }

  return (
    <div className="ideaAndTalent">
      {/* {renderItems(type)} */}
      {/* {type ? <Idea myIdea={false}/> : <Talant />}
      {type ? <Idea myIdea={false}/> : <Talant />} */}
      {ideaType ? <Idea myIdea={false} /> : <Talant dataUser={talents[0]} />}
      {/* {talents ? renderItems(type, talents) : renderItems(type, ideas)} */}

      {ideaType ? (
        <ButtonMoreLoading text={'ідей'} />
      ) : (
        <ButtonMoreLoading text={'талантів'} />
      )}
    </div>
  )
}

export default IdeasAndTalent
