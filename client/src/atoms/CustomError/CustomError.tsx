import './CustomError.scss'

const CustomError = ({ text }: { text: string }) => {
  return <p className="custom-error">{text}</p>
}

export default CustomError
