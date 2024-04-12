import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'

import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import logo from '../../image/logo/small_logo.webp'

import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'

import { CreateIdeaType } from '../../types/types'

import './CreateIdea.scss'
import { selectUserInfo } from '../../store/userSlice'
import SelectArea from '../../atoms/SelectArea/SelectArea'
import ServiceBanyak from '../../service/ServiceBanyak'
import workWithCookies from '../../utils/workWithCookies'
import { error } from 'console'

const CreateIdea = () => {
  const [stack, setStack] = useState<string[]>([])
  const [specialization, setSpecialization] = useState<string[]>([])
  const [newIdeaData, setNewIdeaData] = useState<CreateIdeaType>({
    title: '',
    description: '',
    is_published: true,
  })
  const { IDEAS_URL } = ServiceBanyak()
  const dispatch = useAppDispatch()
  const { allStack } = useAppSelector(selectUserInfo)
  const { getCookies } = workWithCookies()
  const token = getCookies('sessiontokenid')

  console.log('newIdeaData', newIdeaData)

  const mapItemsToObjects = (itemsArray: string[]) => {
    return itemsArray.map((item) => ({
      name: item,
    }))
  }

  const createReqBody = () => {
    return JSON.stringify({
      title: newIdeaData.title,
      description: newIdeaData.description,
      specialization: mapItemsToObjects(specialization),
      stack: mapItemsToObjects(stack),

      is_published: newIdeaData.is_published,
    })
  }

  // add error handing under button

  const handleCreateIdeaClick = async () => {
    console.log(createReqBody())
    try {
      const res = await fetch(IDEAS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: createReqBody(),
      })

      console.log(res)
      if (!res.ok) {
        throw new Error('Failed to create idea')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // {
  //   "title": "Test Postman test",
  //   "description": "Розробити лого для дитячого садочку з різним функціоналом та для різних ротреб",
  //  "specialization": [
  //         {
  //             "name": "qa"
  //         }
  //     ],
  //     "stack": [
  //         {
  //             "name": "react"
  //         }
  //     ],

  //   "is_published": true
  // }

  return (
    <div className="create-idea  create-idea__outside">
      <div className="create-idea__button-back">
        <ButtonBack />
      </div>

      <div className="create-idea__inside">
        <div className="personal-info__main-info">
          <img src={logo} className="personal-info__avatar" alt="User avatar" />

          <div className="personal-info__container">
            <label
              htmlFor="avatar-change"
              className="personal-info__changed-avatar"
            >
              Замінити фото
              <input
                className="personal-info__input"
                type="file"
                id="avatar-change"
              />
            </label>
          </div>
        </div>

        <div className="personal-stack">
          <div className="personal-stack__specialization specialization">
            <h2 className="title-h2-l specialization__title title-mb-20">
              Назва ідеї:
            </h2>
            <input
              type="text"
              placeholder="Сайт Арт-платформа"
              className="specialization__input"
              value={newIdeaData?.title}
              onChange={(e) =>
                setNewIdeaData({
                  ...newIdeaData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">
              Про ідею:
            </h2>
            <textarea
              name="description"
              id=""
              value={newIdeaData?.description}
              className="description about-me__description"
              placeholder="Шукаю бажаючих долучитись до розробки ідеї арт-сайту."
              onChange={(e) =>
                setNewIdeaData(
                  (state) => state && { ...state, description: e.target.value }
                )
              }
            ></textarea>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Потрібні фахівці:
            </h2>

            <div className="technologies__textfield">
              <SelectArea
                values={specialization}
                setValues={setSpecialization}
                placeholder={'Введіть фахівців'}
                isStack={false}
              />
            </div>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Потрібні технології:
            </h2>

            <div className="technologies__textfield">
              <SelectArea
                values={stack}
                setValues={setStack}
                placeholder={'Введіть технології'}
                isStack={true}
              />
            </div>
          </div>

          <ButtonSmall
            style={{ margin: 'auto' }}
            text="Опублікувати ідею"
            btnType="button"
            fn={handleCreateIdeaClick}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateIdea
