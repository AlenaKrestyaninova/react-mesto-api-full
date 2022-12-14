import React from 'react';

function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_type_photo ${card.link ? "popup_opened" : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close"
          onClick={onClose}>
        </button>
        <figure className="popup__figure">
          <img alt={card ? card.name : ''} className="popup__img" src={card ? card.link : ''}/>
          <figcaption className="popup__img-title">{card ? card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;