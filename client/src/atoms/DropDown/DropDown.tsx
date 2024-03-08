import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SpecialtyResType } from '../../types/types'
import { useAppDispatch } from '../../hooks/reduxToolkitHooks'
import { setSpecialty } from '../../store/searchBySpecialtySlice'
import useUUID from '../../hooks/useUUID'
import './DropDown.scss'

type DropDownProps = {
  specialties: SpecialtyResType[]
  filteredSpecialties: SpecialtyResType[]
  showDropDown: boolean
  toggleDropDown: Function
  specialtySelection: Function
}

const DropDown: React.FC<DropDownProps> = ({
  specialties,
  specialtySelection,
  toggleDropDown,
  filteredSpecialties,
}: DropDownProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const specialtiesKeys = useUUID(specialties.length)
  const onClickAllSpecialtiesHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    specialtySelection('')
    dispatch(setSpecialty({ specialty: '' }))
  }

  const onClickHandler = (specialty: string): void => {
    specialtySelection(specialty)
    toggleDropDown()
  }

  const specialtiesToDisplay =
    filteredSpecialties.length > 1 ? filteredSpecialties : specialties
  return (
    <ul className="dropdown">
      <li
        className="dropdown__item"
        // key={uuidv4()}
        onClick={(e): void => onClickAllSpecialtiesHandler(e)}
      >
        -- Усі спеціалізації --
      </li>
      {specialtiesToDisplay.map((specialty, index) => (
        <li
          className="dropdown__item"
          key={specialtiesKeys[index]}
          // key={uuidv4()}
          onClick={(): void => onClickHandler(specialty.name)}
        >
          {specialty.name}
        </li>
      ))}
    </ul>
  )
}

export default DropDown
