import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './DropDown.scss'

type DropDownProps = {
  specialties: string[]
  showDropDown: boolean
  toggleDropDown: Function
  specialtySelection: Function
}

const DropDown: React.FC<DropDownProps> = ({
  specialties,
  specialtySelection,
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  console.log('render DropDown')
  const onClickHandler = (specialty: string): void => {
    specialtySelection(specialty)
    toggleDropDown() // Close dropdown when a city is selected
  }

  return (
    <ul className="dropdown">
      {specialties.map(
        (specialty: string): JSX.Element => (
          <li
            className="dropdown__item"
            key={uuidv4()}
            onClick={(): void => onClickHandler(specialty)}
          >
            {specialty}
          </li>
        )
      )}
    </ul>
  )
}

export default DropDown
