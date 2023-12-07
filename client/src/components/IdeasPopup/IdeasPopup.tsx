import React, { useEffect, useState } from 'react'

import lampIcon from '../../image/icon/idea.svg'
import plusIcon from '../../image/icon/PLUS.svg'
import closeIcon from '../../image/icon/close.svg'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import './IdeasPopup.scss'
import Idea from '../Idea/Idea'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch } from '../../hooks/reduxToolkidHooks'
import { changreMainPreloader } from '../SettingMenu/StateElementSlice'
import { IdeaRespType } from '../../types/types'

const IdeasPopup = ({
  closeModal,
}: {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [ideas, setIdeas] = useState<IdeaRespType[]>([])
  const { getIdeas } = ServiceBanyak()
  const dispatch = useAppDispatch()
  useEffect(() => {
    getIdeas()
      .then((res) => res.json())
      .then((res) => setIdeas(res))
      .then(() => dispatch(changreMainPreloader(false)))
      .catch(() => dispatch(changreMainPreloader(false)))
  }, [])

  return (
    <>
      <div className="parrentPopup">
        <div className="windowPopup">
          <div className="myIdeasHead">
            <div className="iconLabel">
              <img className="lampIcon" src={lampIcon} alt="" />
              Мої ідеї
            </div>
            <ButtonSmall
              style={{ width: '166px', justifyContent: 'center' }}
              text="Додати ідею"
              icon={plusIcon}
            />
            <img
              style={{ width: '40px' }}
              src={closeIcon}
              alt=""
              onClick={() => closeModal(false)}
            />
          </div>
          <div className="myIdeasContainer">
            {ideas.map((idea) => (
              <Idea key={idea.id} myIdea={false} idea={idea} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default IdeasPopup
