import { FC } from 'react';
import './ButtonSmall.scss';

const ButtonSmall: FC<{text: string; icon?: string, fn?: () => void, style?: object, href?: string}> = ({text, icon, fn, style, href}) => {
  const iconElement = icon ? <img src={icon} className='buttonSmall__icon' />: null

  return (
    <a 
      className='buttonSmall'
      onClick={fn}
      href={href}
      style={style}>
      {iconElement}
      {text}
    </a>
  )
}

export default ButtonSmall;