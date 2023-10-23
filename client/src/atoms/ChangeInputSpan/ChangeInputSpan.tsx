import { useState } from "react";

import './ChangeInputSpan.scss';

const ChangeInputSpan = ({value}: {value: string}) => {
  const [activeChanges, setActiveChanges] = useState(false);
  const [initValue, setInitValue] = useState('dsfsdfdfsfsfsfsfs fsdfdsfdsffsd');
  return (
    <label
      htmlFor="change-input-span"  
      className="change-value"
    >

      {!activeChanges ? (
        <span className="change-value__static">
          {initValue}
          </span>
      ) : (
        <input
          type="text"
          className="change-value__changed"
          id="personal__name"
          value={initValue}
        />
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        className={`change-value__pencil ${initValue.length > 16 ? 'change-value__pencil-wrap' : ''} `}
        viewBox="0 0 40 40"
        fill="none"
        onClick={(e) => {
          setActiveChanges(!activeChanges);
          console.log(e);
          
        }}
      >
        <path
          d="M11.4244 23.5756L22.3052 12.6948L27.1539 17.5435L16.2731 28.4244L11.4346 28.4346L11.4244 23.5756Z"
          fill="#1C145E"
        />
        <rect
          x="23.5562"
          y="11.4639"
          width="3.42857"
          height="6.85714"
          transform="rotate(-45 23.5562 11.4639)"
          fill="#1C145E"
        />
      </svg>

    </label>
  )
}

export default ChangeInputSpan;