import { FC } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks';
import { changeLanguage } from "../../components/SettingMenu/StateElementSlice";

import './SwitchToggle.scss';

const SwitchToogle: FC = () => {
  const dispatch = useAppDispatch();
  const {mainLanguage} = useAppSelector(state => state.stateElement)

  const changeActiveLanguage = (leng: string) => {
    
    if (leng === mainLanguage) {
      return (
        {
          'backgroundColor': '#1C145E',
          'border': '2px solid #1C145E',
          'color': '#fff'
        }
      )
    } else {
      return {}
    }
    
  }

  
  

  const changeLang = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    console.log(target.getAttribute('data-lang'));
    
    dispatch(changeLanguage(target.getAttribute('data-lang')))

    // if (target.getAttribute('data-lang') === mainLanguage) {
    //   target
    // }
  }

  return (
    <div className="switch-toggle">
      <span 
        className="switch-toggle__button"
        data-lang='ua'
        style={changeActiveLanguage('ua')}
        onClick={changeLang}>УКР</span>
      <span 
        className="switch-toggle__button"
        style={changeActiveLanguage('eng')}
        onClick={changeLang} 
        data-lang='eng'>ENG</span>
    </div>
  );
}

export default SwitchToogle;