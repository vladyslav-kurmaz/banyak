import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './DropDown.scss'
import { SpecialtyResType } from '../../types/types'

type DropDownProps = {
  specialties: SpecialtyResType[]
  showDropDown: boolean
  toggleDropDown: Function
  specialtySelection: Function
}

const DropDown: React.FC<DropDownProps> = ({
  specialties,
  specialtySelection,
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  const onClickHandler = (specialty: string): void => {
    specialtySelection(specialty)
    toggleDropDown()
  }

  return (
    <ul className="dropdown">
      {specialties.map((specialty) => (
        <li
          className="dropdown__item"
          key={uuidv4()}
          onClick={(): void => onClickHandler(specialty.name)}
        >
          {specialty.name}
        </li>
      ))}
    </ul>
  )
}

export default DropDown
