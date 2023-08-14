import { useState, CSSProperties, FormEvent, ChangeEventHandler } from "react";

import "./CustomInput.scss";

const CustomInput = ({
  value,
  handler,
  label,
  id,
}: {
  value: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
}) => {
  // const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const animationUp = {
    animationName: "flyUp",
    animationDuration: ".2s",
    animationTimingFunction: "linear",
    animationFillMode: "forwards",
  };
  const animationDown = {
    animationName: "flyDown",
    animationDuration: ".2s",
    animationTimingFunction: "linear",
    animationFillMode: "forwards",
  };

  const onFocus = (status: boolean) => {
    setInputFocus(status);
    console.log('focus', status);
    
  };

  const labelStyle = (): CSSProperties => {
    if ((!inputFocus && value !== "") || (inputFocus && value === "")) {
      console.log(2, value, inputFocus);
      return { top: 0 };
    } else if (value !== "") {
      console.log(3, value, inputFocus);
      return { top: 0 };
    } else if ((inputFocus && value !== "") ) {
      console.log(6, value, inputFocus);
      return animationUp;
    } else if (!inputFocus && value === "") {
      console.log(1, value, inputFocus);
      return animationDown;
    } else {
      console.log(4, value, inputFocus);
      return animationUp;
    }
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // dispatch(changeInputValue(e.target.value))
    // setInputValue(e.target.value);

    handler(e);
  };

  // const userError = () => {
  //   return error ?
  //     <div className="search__error">
  //       User with this nikname is not found
  //     </div>
  //     :
  //     null
  // }
  
  return (
    <div className="custom-input__line">
      <input
        onFocus={() => onFocus(true)}
        onBlur={() => onFocus(false)}
        onChange={onInputChange}
        id={id}
        type="text"
        className="custom-input__line-input"
        placeholder=""
        value={value}
      />
      <label
        onClick={() => onFocus(true)}
        htmlFor={id}
        style={labelStyle()}
        className="custom-input__line-label"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
