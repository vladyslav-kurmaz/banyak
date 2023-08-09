
import './Idea.scss';
import plugIcon from '../../image/logo/small_logo.webp';
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall';

// class знайденого елементу це found


const Idea = () => {

  const data = ['Frontend developer', 'Backend developer', 'Backend developer']

  const renderSpecialty = (data: string[]) => {

    return data.map((item, i) => {
      if (i < 2) {
        return (
          <li className='idea__specialty-item'>
            <span className='idea__specialty-item-status '></span>
            <span className='idea__specialty-item-text'>{item}</span>
          </li>
        ) 
      } else {
        return null  
      }
      
    })
  }

  const allSpecialty = data.length > 1 ?
    <li className='idea__specialty-item all-specialty'>
      <span className='idea__specialty-item-status'></span>
      <span className='idea__specialty-item-text'>{`+${data.length - 2}`}</span>
    </li>
    :
    null

  return (
    <div className="idea">
      <div className="idea__img">
        <img src={plugIcon} alt="" className="idea__img-picture" />
      </div>
      <div className="idea__info">
          <h2 className='idea__info-title'>Сайт Арт-платформа</h2>
          <p className='idea__info-description'>Шукаю бажаючих долучитись до розробки ідеї арт-сайту.</p>
      </div>
      <ul className="idea__specialty">
        {renderSpecialty(data)}
        {allSpecialty}
      </ul>
      <div className='idea__button'>
        <ButtonSmall text='Долучитись'/>
      </div>
      <div className="idea__metrics">
        <div className="idea__metrics-view">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#061730"/>
          </svg>
          <span className="idea__metrics-view-total">5</span>
        </div>
        <div className="idea__metrics-data">13.07.2023</div>
      </div>
      
    </div>
  )
}

export default Idea;