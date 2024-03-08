import './ButtonMoreLoading.scss'

const ButtonMoreLoading = ({
  text,
  setCurrentPage,
  disabled,
}: {
  text: string
  setCurrentPage: Function
  disabled: boolean
}) => {
  const handleButtonMoreLoadingClick = () => {
    setCurrentPage((currentPage: number) => currentPage + 1)
  }

  return (
    <button
      type="button"
      className="more-loading"
      onClick={(): void => {
        handleButtonMoreLoadingClick()
      }}
      disabled={disabled}
    >
      Ще {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="41"
        height="40"
        viewBox="0 0 41 40"
        fill="none"
      >
        <path
          d="M8.5 12H9.58L20.5 22.7059L31.42 12H32.5V22.5882L23.14 32H17.86L8.5 22.5882V12Z"
          fill="#FCFCFC"
        />
      </svg>
    </button>
  )
}

export default ButtonMoreLoading
