import React from 'react';
import okSignUp from '../images/Ok.svg';
import neOkSignUp from '../images/NeOk.svg';

function InfoTooltip(props) {
  const {isOpen, onClose, registerOk} = props;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <button className="popup__close"
          onClick={onClose}>
        </button>
        <div className='popup__content'>
          <img className="popup__register-image"
            src={registerOk ? okSignUp : neOkSignUp} 
            alt={registerOk ? 'Вы успешно зарегистрировались!' : 'Упс'}
          />
          <h2 className="popup__message">{registerOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        </div>
        
        
      </div>
    </div>
  );
}

export default InfoTooltip;
