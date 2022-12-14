import React from 'react';

function PopupWithForm(props) {
  const {name, title, buttonText, isOpen, onClose, onSubmit, children} = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <button className="popup__close"
          onClick={onClose}>
        </button>
        <h2 className="popup__title">{title}</h2>
        <form action="#" className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className={`popup__submit popup__submit_${name}`}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
