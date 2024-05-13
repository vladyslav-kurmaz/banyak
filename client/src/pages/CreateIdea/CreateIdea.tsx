import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxToolkitHooks'
import ButtonBack from '../../atoms/ButtonBack/ButtonBack'
import logo from '../../image/logo/small_logo.webp'
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall'
import { CreateIdeaType, InitialIdeaStatusType } from '../../types/types'
import SelectArea from '../../atoms/SelectArea/SelectArea'
import workWithCookies from '../../utils/workWithCookies'
import CustomError from '../../atoms/CustomError/CustomError'
import validateIdea from '../../utils/validateIdea'
import { changeMainPreloader } from '../../store/stateElementSlice'

import './CreateIdea.scss'
import RadioInput from '../../atoms/RadioInput/RadioInput'
import { initialIdeaStatus } from '../../constants/initialIdeaStatus'
import { IDEAS_URL, IDEA_AVATAR } from '../../constants/URLs'
import { mapItemsToObjects } from '../../utils/mapItemsToObject'

const CreateIdea = () => {
  const [stack, setStack] = useState<string[]>([])
  const [specialization, setSpecialization] = useState<string[]>([])
  const [newIdeaData, setNewIdeaData] = useState<CreateIdeaType>({
    title: '',
    description: '',
    is_published: true,
  })
  const [ideaStatus, setIdeaStatus] =
    useState<InitialIdeaStatusType[]>(initialIdeaStatus)
  const [error, setError] = useState({ error: false, message: '' })
  const [newIdeaAvatar, setNewIdeaAvatar] = useState<File | undefined>()
  // const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getCookies } = workWithCookies()
  const token = getCookies('sessiontokenid')
  const { title, description } = newIdeaData
  const newIdeaAvatarBlob = newIdeaAvatar as File
  const imageUrl = newIdeaAvatarBlob
    ? URL.createObjectURL(newIdeaAvatarBlob)
    : ''
  const clearErrorStatus = () => setError({ error: false, message: '' })

  const createReqBody = () => {
    return JSON.stringify({
      title: newIdeaData.title,
      description: newIdeaData.description,
      specialization: mapItemsToObjects(specialization),
      stack: mapItemsToObjects(stack),
      is_published: newIdeaData.is_published,
    })
  }

  const handleCreateIdeaClick = async () => {
    dispatch(changeMainPreloader(true))
    clearErrorStatus()
    if (!validateIdea({ title, description, specialization, stack, setError }))
      return
    try {
      const res = await fetch(IDEAS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: createReqBody(),
      })

      if (!res.ok) {
        throw new Error('Failed to create idea')
      }

      await sendNewIdeaAvatar()
    } catch (err) {
      console.error(err)
      if (err instanceof Error) setError({ error: true, message: err.message })
    }

    setStack([])
    setSpecialization([])
    setNewIdeaData({
      title: '',
      description: '',
      is_published: true,
    })
    dispatch(changeMainPreloader(false))
    navigate('/')
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
  const handleOnChangeFile = (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setNewIdeaAvatar(target.files[0])

    // const file = new FileReader()

    // file.onload = () => {
    //   setPreview(file.result)
    // }

    // file.readAsDataURL(target.files[0])
  }

  const sendNewIdeaAvatar = async () => {
    console.log('send avatar')
    if (typeof newIdeaAvatar === 'undefined') return

    const formData = new FormData()
    formData.append('avatar', newIdeaAvatar)
    console.log('formData', formData.getAll('avatar'))

    try {
      console.log('test from sendNewIdeaAvatar')
      const response = await fetch(IDEA_AVATAR, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()
      console.log('idea avat res', result)

      // setNewAvatar(undefined)
      dispatch(changeMainPreloader(false))
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = () => {}

  const handleIdeaStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    const isPublished = id === 'inactive' || id === 'finished' ? false : true
    setIdeaStatus(
      ideaStatus.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: checked,
            }
          : item
      )
    )
    setNewIdeaData({ ...newIdeaData, is_published: isPublished })
  }

  console.log('newIdeaData', newIdeaData)

  return (
    <div className="create-idea  create-idea__outside">
      <div className="create-idea__button-back">
        <ButtonBack />
      </div>

      <div className="create-idea__inside">
        <div className="personal-info__main-info">
          <img
            src={/*(preview as string)||*/ imageUrl || logo}
            className="personal-info__avatar"
            alt="Idea avatar"
          />

          <div className="personal-info__container">
            <label
              htmlFor="avatar-change"
              className="personal-info__changed-avatar"
            >
              Замінити фото
              <input
                className="personal-info__input"
                accept="image/*"
                type="file"
                id="avatar-change"
                onChange={(e) => handleOnChangeFile(e, 'avatar')}
              />
            </label>
            <h2 className="title-h2-l specialization__title title-mb-20">
              Статус ідеї:
            </h2>
            <form onSubmit={handleFormSubmit}>
              {ideaStatus.map((status) => (
                <RadioInput
                  key={status.id}
                  id={status.id}
                  value={status.value}
                  checked={status.checked}
                  handleChange={handleIdeaStatusChange}
                />
              ))}
            </form>
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
              onChange={(e) => {
                clearErrorStatus()
                setNewIdeaData({
                  ...newIdeaData,
                  title: e.target.value,
                })
              }}
              required
            />
          </div>

          <div className="personal-stack__about-me about-me">
            <h2 className="title-h2-l about-me__title title-mb-20">
              Про ідею:
            </h2>
            <textarea
              name="description"
              id="description"
              value={newIdeaData?.description}
              className="description about-me__description"
              placeholder="Шукаю бажаючих долучитись до розробки ідеї арт-сайту."
              onChange={(e) => {
                clearErrorStatus()
                setNewIdeaData(
                  (state) => state && { ...state, description: e.target.value }
                )
              }}
              required
            ></textarea>
          </div>

          <div className="personal-stack__technologies technologies">
            <h2 className="title-h2-l technologies__title title-mb-20">
              Потрібні фахівці:
            </h2>

            <div className="technologies__textfield">
              <SelectArea
                key={'specialization'}
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
                key={'stack'}
                values={stack}
                setValues={setStack}
                placeholder={'Введіть технології'}
                isStack={true}
              />
            </div>
          </div>
          {error.error && <CustomError text={error.message} />}
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
