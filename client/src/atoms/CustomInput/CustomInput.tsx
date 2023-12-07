import { useState, CSSProperties, FormEvent, ChangeEventHandler } from 'react'

import validationForm from '../../utils/validationForm'

import './CustomInput.scss'

const CustomInput = ({
  value,
  handler,
  label,
  id,
  name,
  type,
}: {
  value: string
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  id: string
  name: string
  type: string
}) => {
  const [inputFocus, setInputFocus] = useState(false)
  const [message, setMessage] = useState(false)
  const [stateType, setStateType] = useState(type)
  const styleClass = value === '' ? '' : validationForm(value, name)?.class

  const onFocus = (status: boolean) => {
    setInputFocus(status)
    status === false && value === '' && setMessage(false)
  }

  const labelStyle = (): CSSProperties => {
    if (!inputFocus && value !== '') {
      return { top: 0, transition: 'all .2s' }
    } else if (inputFocus && value === '') {
      return { top: 0, transition: 'all .2s' }
    } else if (value !== '') {
      return { top: 0, transition: 'all .2s' }
    } else if (inputFocus && value !== '') {
      return { top: '50%', transition: 'all .2s' }
    } else if (!inputFocus && value === '') {
      return { top: '50%', transition: 'all .2s' }
    } else {
      return {}
    }
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handler(e)
    setMessage(true)
  }

  const renderMessage = () => {
    return validationForm(value, name)?.errorStatus === false ? (
      <div className="custom-input__message-good">
        <div className="custom-input__message-good-elem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="5"
              y="11.0107"
              width="11.3283"
              height="4"
              transform="rotate(-45 5 11.0107)"
              fill="#12733F"
            />
            <rect
              x="3.58105"
              y="4.00488"
              width="4.75954"
              height="4"
              transform="rotate(45 3.58105 4.00488)"
              fill="#12733F"
            />
          </svg>
        </div>
        <div className="custom-input__message-good-text">
          {validationForm(value, name)?.message}
        </div>
      </div>
    ) : (
      <div className="custom-input__message-error">
        <div className="custom-input__message-error-elem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_192_40)">
              <rect
                x="0.00195312"
                y="12.7656"
                width="18.0623"
                height="4"
                transform="rotate(-45 0.00195312 12.7656)"
                fill="#A81818"
              />
              <rect
                x="11.9639"
                y="8.72461"
                width="5.71593"
                height="4"
                transform="rotate(45 11.9639 8.72461)"
                fill="#A81818"
              />
              <rect
                x="3.23633"
                y="-0.00292969"
                width="5.08233"
                height="4"
                transform="rotate(45 3.23633 -0.00292969)"
                fill="#A81818"
              />
            </g>
            <defs>
              <clipPath id="clip0_192_40">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="custom-input__message-error-text">
          {validationForm(value, name)?.message}
        </div>
      </div>
    )
  }
  const renderInput = (type: string) => {
    switch (type) {
      case 'text':
        return (
          <>
            <input
              onFocus={() => onFocus(true)}
              onBlur={() => onFocus(false)}
              onChange={onInputChange}
              id={id}
              type="text"
              className={`custom-input__input ${styleClass}`}
              placeholder=""
              value={value}
              name={name}
            />
            <label
              onClick={() => onFocus(true)}
              htmlFor={id}
              style={labelStyle()}
              className={`custom-input__label ${styleClass}`}
            >
              {label}
            </label>

            <div className="custom-input__message">
              {value !== '' && message ? renderMessage() : null}
            </div>
          </>
        )
      case 'password':
        return (
          <>
            <input
              onFocus={() => onFocus(true)}
              onBlur={() => onFocus(false)}
              onChange={onInputChange}
              id={id}
              type={stateType}
              className={`custom-input__input password ${styleClass}`}
              placeholder=""
              value={value}
              name={name}
            />

            <label
              onClick={() => onFocus(true)}
              htmlFor={id}
              style={labelStyle()}
              className={`custom-input__label ${styleClass}`}
            >
              {label}
            </label>

            <div
              className="custom-input__eye"
              onClick={() =>
                setStateType(stateType === 'password' ? 'text' : 'password')
              }
            >
              {stateType === 'password' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="custom-input__eye-false"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M1 1H32C35.866 1 39 4.13401 39 8V32C39 35.866 35.866 39 32 39H1V1Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M32 17C32 23.6274 26.6274 29 20 29C13.3726 29 8 23.6274 8 17C13 17 12.8726 17 19.5 17C26.1274 17 26 17.0001 32 17Z"
                    fill="#1C145E"
                    className={styleClass}
                  />
                  <circle cx="20" cy="17" r="6" fill="#FCFCFC" />
                  <path
                    d="M1 1H32C35.866 1 39 4.13401 39 8V32C39 35.866 35.866 39 32 39H1V1Z"
                    stroke="#1C145E"
                    strokeWidth="2"
                    className={styleClass}
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="custom-input__eye-true"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="12"
                    fill="#1C145E"
                    className={styleClass}
                  />
                  <circle cx="20" cy="20" r="6" fill="#FCFCFC" />
                  <circle
                    cx="20"
                    cy="20"
                    r="4"
                    fill="#061730"
                    className={styleClass}
                  />
                  <path
                    d="M1 1H32C35.866 1 39 4.13401 39 8V32C39 35.866 35.866 39 32 39H1V1Z"
                    stroke="#1C145E"
                    strokeWidth="2"
                    className={styleClass}
                  />
                </svg>
              )}
            </div>

            <div className="custom-input__message">
              {value !== '' && message ? renderMessage() : null}
            </div>
          </>
        )
    }
  }

  return <div className="custom-input">{renderInput(type)}</div>
}

export default CustomInput
