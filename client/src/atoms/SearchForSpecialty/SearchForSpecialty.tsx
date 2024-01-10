import { FC, useState } from 'react'
import DropDown from '../DropDown/DropDown'
import './SearchForSpecialty.scss'

const SearchForSpecialty: FC<{
  fn?: () => void
  formStyle?: object
  inputStyle?: object
  buttonStyle?: object
  svgStyle?: object
}> = ({ fn, formStyle, inputStyle, buttonStyle, svgStyle }) => {
  // console.log('render SearchForSpecialty')

  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [selectSpecialty, setSelectSpecialty] = useState<string>('')

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

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false)
    }
  }

  /**
   * Callback function to consume the
   * city name from the child component
   *
   * @param city  The selected city
   */
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
        // className={showDropDown ? 'search-for-specialty active' : undefined}
        className="search-for-specialty__button"
        style={buttonStyle}
        onClick={(): void => toggleDropDown()}
        // onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
        //   dismissHandler(e)
        // }
      >
        {showDropDown && (
          <DropDown
            specialties={specialties()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            specialtySelection={specialtySelection}
          />
        )}
        <svg
          style={svgStyle}
          className="search-for-specialty__image"
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
