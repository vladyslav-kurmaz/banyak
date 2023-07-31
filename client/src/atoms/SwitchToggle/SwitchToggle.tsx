import { FC } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkidHooks';
import { changeLanguage, changeStatusInstr } from "../../components/SettingMenu/StateElementSlice";

import './SwitchToggle.scss';

type SwitchToggle = {
  prop1: string,
  prop2: string
}

const SwitchToogle: FC <SwitchToggle> = ({prop1, prop2}) => {
  const dispatch = useAppDispatch();
  const {mainLanguage, statusInstr} = useAppSelector(state => state.stateElement)

  const changeActiveLanguage = (status: string) => {
    
    if (status === mainLanguage || status === statusInstr) {
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

    switch(prop1 || prop2) {
      case 'Власник ідеї' || 'Талант':
        dispatch(changeStatusInstr(target.getAttribute('data-prop')));
        break;
      case 'УКР' || 'ENG':
        dispatch(changeLanguage(target.getAttribute('data-prop')));
        break;
    }
    
    
  }

  return (
    <div className="switch-toggle">
      <span 
        className="switch-toggle__button"
        data-prop={prop1}
        style={changeActiveLanguage(prop1)}
        onClick={changeLang}>{prop1}</span>
      <span 
        className="switch-toggle__button"
        style={changeActiveLanguage(prop2)}
        onClick={changeLang} 
        data-prop={prop2}>{prop2}</span>
    </div>
  );
}

export default SwitchToogle;