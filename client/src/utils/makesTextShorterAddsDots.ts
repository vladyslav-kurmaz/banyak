const makesTextShorterAddsDots = (
  text: string,
  charNumber: number = 20
): string | null => {
  if (!text) {
    // console.error(
    //   'Invalid text provided itnto makesTextShorterAddsDots function'
    // )
    return null
  }
  return text.length > charNumber ? `${text.slice(0, charNumber)}...` : text
}

export default makesTextShorterAddsDots
