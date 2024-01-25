import { ChangeEvent, FC, useState } from 'react'
import './SearchByStack.scss'

// Watch redux searc implementing

const SearchByStack: FC<{
  fn?: () => void
  formStyle?: object
  inputStyle?: object
  buttonStyle?: object
  svgStyle?: object
}> = ({ fn, formStyle, inputStyle, buttonStyle, svgStyle }) => {
  const [stackFilter, setStackFilter] = useState<string>('')

  const handleStackFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = e.currentTarget.value

    console.log(inputValue)
    setStackFilter(inputValue)
  }

  return (
    <div className="search-for-stack" style={formStyle}>
      <input
        className="search-for-stack__input"
        type="text"
        placeholder="Технологія"
        style={inputStyle}
        value={stackFilter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleStackFilterChange(e)
        }
      ></input>
      <button
        type="submit"
        className="search-for-stack__button"
        // type="submit"
        onClick={(e) => {
          console.log(e.currentTarget)
          console.log('stackFilter', stackFilter)
          // e.preventDefault()
        }}
        style={buttonStyle}
      >
        <svg
          style={svgStyle}
          className="search-for-stack__image"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle cx="18" cy="18" r="12" fill="#1C145E" />
          <rect
            x="24.9302"
            y="19.27"
            width="13"
            height="8"
            transform="rotate(45 24.9302 19.27)"
            fill="#1C145E"
          />
          <circle cx="18" cy="18" r="6" fill="#FCFCFC" />
        </svg>
      </button>
    </div>
  )
}

export default SearchByStack
