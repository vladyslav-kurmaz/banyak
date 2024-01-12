import { FC, useEffect, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import './SearchForSpecialty.scss'
import ServiceBanyak from '../../service/ServiceBanyak'
import { useAppDispatch } from '../../hooks/reduxToolkidHooks'
import { changreMainPreloader } from '../../components/SettingMenu/StateElementSlice'
import { SpecialtyResType } from '../../types/types'

const SearchForSpecialty: FC<{
  fn?: () => void
  formStyle?: object
  inputStyle?: object
  buttonStyle?: object
  svgStyle?: object
}> = ({ fn, formStyle, inputStyle, buttonStyle, svgStyle }) => {
  const { getAllSpecialties } = ServiceBanyak()
  const dispatch = useAppDispatch()
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [selectSpecialty, setSelectSpecialty] = useState<string>('')
  const [specialtiesList, setSpecialtiesList] = useState<SpecialtyResType[]>([])

  const specialties = () => {
    return [
      'Frontend',
      'Backend',
      'FullStack',
      'Designer',
      'Python developer',
      'Data Since',
      'Frontend',
      'Backend',
      'FullStack',
      'Frontend',
      'Backend',
      'FullStack',
    ]
  }

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const specialties = await getAllSpecialties()
        if (specialties) {
          setSpecialtiesList(specialties.results)
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

    fetchSpecialties()
  }, [])
  console.log(specialtiesList)

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false)
    }
  }

  const specialtySelection = (specialty: string): void => {
    setSelectSpecialty(specialty)
  }

  return (
    <div className="search-for-specialty" style={formStyle}>
      <input
        className="search-for-specialty__input"
        type="text"
        placeholder="Спеціалізація"
        value={selectSpecialty}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSelectSpecialty(e.target.value)
        }
        style={inputStyle}
      ></input>
      <button
        className="search-for-specialty__button"
        style={buttonStyle}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        {showDropDown && (
          <DropDown
            specialties={specialtiesList}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            specialtySelection={specialtySelection}
          />
        )}
        <svg
          style={svgStyle}
          className={
            showDropDown
              ? 'search-for-specialty__activ'
              : 'search-for-specialty__image'
          }
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M8 12H9.08L20 22.7059L30.92 12H32V22.5882L22.64 32H17.36L8 22.5882V12Z"
            fill="#1C145E"
          />
        </svg>
      </button>
    </div>
  )
}

export default SearchForSpecialty
