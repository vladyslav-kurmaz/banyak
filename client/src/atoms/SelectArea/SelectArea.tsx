import { useState } from 'react'
import { SelectAreaPropType } from '../../types/types'

import './SelectArea.scss'

const SelectArea = ({ values, placeholder, setValues }: SelectAreaPropType) => {
  const [stackInput, setStackInput] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const tech = formJson.name as string
    setValues(() => [...values, tech])
    setStackInput('')
  }

  const handleDeleteValue = (item: string) => {
    const filteredValues = values.filter((v) => v !== item)
    setValues(() => [...filteredValues])
  }

  return (
    <div tabIndex={0} className="select-area-container">
      <span className="">
        {values.map((item, index) => (
          <button key={index} type="button" className="item-btn">
            <span className="close" onClick={() => handleDeleteValue(item)}>
              &times;
            </span>
            {item}
          </button>
        ))}
      </span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={stackInput}
          onChange={(e) => setStackInput(e.target.value)}
          className="input"
          placeholder={placeholder}
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
