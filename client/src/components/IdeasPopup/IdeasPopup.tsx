import React from 'react';

import lampIcon from '../../image/icon/idea.svg';
import plusIcon from '../../image/icon/PLUS.svg';
import closeIcon from '../../image/icon/close.svg';
import ButtonSmall from "../../atoms/ButtonSmall/ButtonSmall";
import './IdeasPopup.scss';
import Idea from '../Idea/Idea';

const IdeasPopup = ({closeModal}: {closeModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <>
            <div className='parrentPopup'>
                <div className='windowPopup'>
                    <div className='myIdeasHead'>
                        <div className='iconLabel'>
                            <img className='lampIcon' src={lampIcon} alt="" />
                            Мої ідеї
                        </div>
                        <ButtonSmall style={{width: "166px", justifyContent: "center", }} text="Додати ідею" icon={plusIcon}/>
                        <img style={{width: "40px"}} src={closeIcon} alt="" onClick={() => closeModal(false)}/>
                    </div>
                    <div className='myIdeasContainer'>
                        <Idea myIdea={true}/>
                        <Idea myIdea={true}/>
                        <Idea myIdea={true}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default IdeasPopup