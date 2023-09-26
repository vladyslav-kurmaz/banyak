import { FC } from 'react';
import './ButtonSmall.scss';

const ButtonSmall: FC<{text: string; icon?: string, fn?: () => void, style?: object}> = ({text, icon, fn, style}) => {
  const iconElement = icon ? <img src={icon} className='buttonSmall__icon' />: null

  return (
    <a 
      className='buttonSmall'
      onClick={fn}
    
      style={style}>
      {iconElement}
      {text}
    </a>
  )
}

export default ButtonSmall;