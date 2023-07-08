import { FC } from 'react';
import './ButtonSmall.scss';

const ButtonSmall: FC<{text: string; icon?: string, fn?: () => void}> = ({text, icon, fn}) => {
  const iconElement = icon ? <img src={icon} className='buttonSmall__icon' />: null

  return (
    <a 
      className='buttonSmall'
      onClick={fn}>
      {iconElement}
      {text}
    </a>
  )
}

export default ButtonSmall;