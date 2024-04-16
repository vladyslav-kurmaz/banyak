import { useEffect, useRef, useState } from 'react'
import { SelectAreaPropType } from '../../types/types'

import './SelectArea.scss'
import useUUID from '../../hooks/useUUID'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const SelectArea = ({
  values,
  placeholder,
  setValues,
  isStack,
}: SelectAreaPropType) => {
  const [inputValue, setInputValue] = useState('')
  const ref = useOutsideClick(() => {
    handleSubmit()
  })
  const valuesKeys = useUUID(values.length)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleSubmit = async () => {
    if (inputValue.trim() === '') {
      return
    }
    setValues(() => [...values, inputValue])
    setInputValue('')
  }

  const handleDeleteValue = (item: string) => {
    const filteredValues = values.filter((v) => v !== item)
    setValues(() => [...filteredValues])
  }

  return (
    <div tabIndex={0} className="select-area-container">
      <span>
        {values.map((item, index) => (
          <button
            key={index}
            type="button"
            className={isStack ? 'item-btn-stack' : 'item-btn'}
          >
            <span className="close" onClick={() => handleDeleteValue(item)}>
              &times;
            </span>
            {item}
          </button>
        ))}
      </span>
      <form ref={ref} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input"
          placeholder={placeholder}
          required
        />
      </form>

      {/* select list from server
      <ul className="">
        <li className="">redux</li>
        <li className="">python</li>
      </ul> */}
    </div>
  )
}

export default SelectArea
