

import './CrossCustom.scss';

const CrossCustom = ({style, close} : {style: object; close: () => void}) => {
  return (
    <div 
      className='cross' 
      style={style}
      onClick={close}>
        
      <span className='cross__small top'></span>
      <span className='cross__big'></span>
      <span className='cross__small bottom'></span>
    </div>
  )
}

export default CrossCustom;