const makesTextShorterAddsDots = (text: string, charNumber: number) => {
  return text.length > charNumber ? `${text.slice(0, charNumber)}...` : text
}

export default makesTextShorterAddsDots
