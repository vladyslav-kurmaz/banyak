
import './Talant.scss';
import plugIcon from '../../image/logo/small_logo.webp';
import ButtonSmall from '../../atoms/ButtonSmall/ButtonSmall';

// class знайденого елементу це found


const Talant = () => {

  const data = ['Figma', 'A/B testing', 'Adobe Illustrator', 'Adobe Illustrator']

  const renderSpecialty = (data: string[]) => {
    

    return data.map((item, i) => {
      const itemLengh = item.length < 18 ? `+${item}`:`+${item}...`;
      if (i < 3) {
        return (
          <li className='talant__container-technologies-item'>
            <span className='talant__container-technologies-item-teh'>
              {itemLengh}
            </span>
            
          </li>
        ) 
      } else {
        return null  
      }
      
    })
  }

  const allSpecialty = data.length > 3 ?
    <li className='talant__container-technologies-item all-technologies'>...</li>
    :
    null

  return (
    <div className="talant">
      <div className="talant__img">
        <img src={plugIcon} alt="" className="talant__img-picture" />
      </div>

      <div className="talant__container">
        <div className="talant__container-info">
            <h2 className='talant__container-info-title'>UI/UX Designer</h2>
            <p className='talant__container-info-description'>Шукаю цікавий проект для підвищення навичків в командній роботі</p>
            <div className="talant__container-button">
              <ButtonSmall text='Портфоліо' style={{'padding-bottom': '2px', 'padding-top': '2px', 'font-size': '15px'}}/>
            </div>
            
        </div>
        <ul className="talant__container-technologies">
          {renderSpecialty(data)}
          {allSpecialty}
        </ul>
      </div>

      <div className='talant__button'>
        <ButtonSmall text='Зв’язатись'/>
      </div>
      <div className="talant__metrics">
        <div className="talant__metrics-view">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#061730"/>
          </svg>
          <span className="talant__metrics-view-total">5</span>
        </div>
        <div className="talant__metrics-data">13.07.2023</div>
      </div>
      
    </div>
  )
}

export default Talant;