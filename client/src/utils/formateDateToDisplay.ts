function formateDateToDisplay(dateTime: string): string {
  const [datePart] = dateTime.split('T')
  const [year, month, day] = datePart.split('-')

  return `${day}.${month}.${year}`
}
export default formateDateToDisplay
