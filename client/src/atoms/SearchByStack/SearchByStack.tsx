import { ChangeEvent, FC, useState } from 'react'
import './SearchByStack.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks'
import { selectSerchByStack, setStack } from '../../store/searchByStackSlice'

// Watch redux searc implementing

const SearchByStack: FC<{
  fn?: () => void
  formStyle?: object
  inputStyle?: object
  buttonStyle?: object
  svgStyle?: object
}> = ({ fn, formStyle, inputStyle, buttonStyle, svgStyle }) => {
  const [stackFilter, setStackFilter] = useState<string>('')
  const dispatch = useAppDispatch()
  // const stackForSearch = useAppSelector(selectSerchByStack)
  console.log('stackFilter test', stackFilter)

  const handleStackFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    // console.log(inputValue)
    setStackFilter(inputValue)
    // dispatch(setStack({ stack: inputValue }))
  }

  const handleButtonClick = () => {
    dispatch(setStack({ stack: stackFilter }))
  }
  // change redux state control to useState

  return (
    <div className="search-for-stack" style={formStyle}>
      <input
        className="search-for-stack__input"
        type="text"
        placeholder="Технологія"
        style={inputStyle}
        value={stackFilter}
        // value={stackForSearch.stack}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleStackFilterChange(e)
        }
      ></input>
      <button
        type="button"
        className="search-for-stack__button"
        onClick={() => {
          handleButtonClick()
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
