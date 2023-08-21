import { useState, CSSProperties, FormEvent, ChangeEventHandler } from "react";

import validationForm from "../../untils/validationForm";

import "./CustomInput.scss";

const CustomInput = ({
  value,
  handler,
  label,
  id,
  name
}: {
  value: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  name: string;
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [message, setMessage] = useState(false);


  const onFocus = (status: boolean) => {
    setInputFocus(status);  
    status === false && value === '' &&  setMessage(false);
  };

  const labelStyle = (): CSSProperties => {
    if ((!inputFocus && value !== "")) {
      return { top: 0,  transition: 'all .2s'};
    } else if ((inputFocus && value === "")) {
      return { top: 0,  transition: 'all .2s'}
    } else if (value !== "") {
      return { top: 0, transition: 'all .2s' };
    } else if ((inputFocus && value !== "") ) {
      return { top: '50%',  transition: 'all .2s'}
    } else if (!inputFocus && value === "") {
      return { top: '50%', transition: 'all .2s' };
    } else {
      return {};
    }
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handler(e);
    setMessage(true)
  };

  // const userError = () => {
  //   return error ?
  //     <div className="search__error">
  //       User with this nikname is not found
  //     </div>
  //     :
  //     null
  // }

  const renderMessage = () => {
    return validationForm(value, name)?.errorStatus === false 
        ?
        <div className="custom-input__message-good">
          <div className="custom-input__message-good-elem">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="11.0107" width="11.3283" height="4" transform="rotate(-45 5 11.0107)" fill="#12733F"/>
              <rect x="3.58105" y="4.00488" width="4.75954" height="4" transform="rotate(45 3.58105 4.00488)" fill="#12733F"/>
            </svg>
          </div>
          <div className="custom-input__message-good-text">{validationForm(value, name)?.message}</div>
        </div>
        :
        <div className="custom-input__message-error">
          <div className="custom-input__message-error-elem">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clipPath="url(#clip0_192_40)">
                <rect x="0.00195312" y="12.7656" width="18.0623" height="4" transform="rotate(-45 0.00195312 12.7656)" fill="#A81818"/>
                <rect x="11.9639" y="8.72461" width="5.71593" height="4" transform="rotate(45 11.9639 8.72461)" fill="#A81818"/>
                <rect x="3.23633" y="-0.00292969" width="5.08233" height="4" transform="rotate(45 3.23633 -0.00292969)" fill="#A81818"/>
              </g>
              <defs>
                <clipPath id="clip0_192_40">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="custom-input__message-error-text">{validationForm(value, name)?.message}</div>
        </div>
  }
  
  return (
    <div className="custom-input">
      <input
        onFocus={() => onFocus(true)}
        onBlur={() => onFocus(false)}
        onChange={onInputChange}
        id={id}
        type="text"
        className="custom-input__input"
        placeholder=""
        value={value}
        name={name}
      />
      <label
        onClick={() => onFocus(true)}
        htmlFor={id}
        style={labelStyle()}
        className="custom-input__label"
      >
        {label}
      </label>

      <div className="custom-input__message">
        {message ? renderMessage() : null}

      </div>

        
      
    </div>
  );
};

export default CustomInput;
