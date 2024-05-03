import { FC } from 'react'
import './RadioInput.scss'

interface RadioInputProps {
  id: string
  value: string
  checked: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioInput: FC<RadioInputProps> = ({
  id,
  value,
  checked,
  handleChange,
}) => {
  return (
    <div className="radio-input">
      <input
        type="radio"
        id={id}
        name="ideaStatus"
        value={value}
        defaultChecked={checked}
        onChange={handleChange}
        className="radio-input__input"
      />
      <label htmlFor={id} className="radio-input__label">
        {value}
      </label>
    </div>
  )
}

export default RadioInput
