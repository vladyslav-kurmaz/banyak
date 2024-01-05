import formateDateToDisplay from '../../utils/formateDateToDisplay'

function DisplayDateFromDB({ date }: { date: string | undefined }) {
  return date ? (
    <div className="idea__metric-metrics-data">
      {formateDateToDisplay(date)}
    </div>
  ) : (
    <div></div>
  )
}

export default DisplayDateFromDB
