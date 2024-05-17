import { FC } from 'react'
import './ButtonSmall.scss'

type ButtonSmallProps = {
  text: string
  icon?: string
  fn?: () => void
  style?: object
  href?: string
  btnType?: 'button' | 'submit' | 'reset' | undefined
}

const ButtonSmall: FC<ButtonSmallProps> = ({
  text,
  icon,
  fn,
  style,
  href,
  btnType,
}) => {
  const iconElement = icon ? (
    <img src={icon} alt="button icon" className="buttonSmall__icon" />
  ) : null

  return btnType ? (
    <button type={btnType} className="buttonSmall" onClick={fn} style={style}>
      {iconElement}
      {text}
    </button>
  ) : (
    <a className="buttonSmall" onClick={fn} href={href} style={style}>
      {iconElement}
      {text}
    </a>
  )
}

export default ButtonSmall
