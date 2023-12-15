import formateDateToDisplay from '../../utils/formateDateToDisplay'

function DisplayDateFromDB({ date }: { date: string }) {
  return (
    <div className="idea__metric-metrics-data">
      {formateDateToDisplay(date)}
    </div>
  )
}

export default DisplayDateFromDB
