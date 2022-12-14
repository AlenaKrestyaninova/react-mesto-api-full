import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const {onCardClick, onCardLike, onCardDelete, card} = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`card__trash ${isOwn ? '' : 'card__trash_hidden'}`); 
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);

  function handleClick(card) {
    onCardClick(card);
  }

  function handleLikeClick(card) {
    onCardLike(card);
  }

  function handleDeleteClick(card) {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button type="button" className={cardDeleteButtonClassName}
        onClick = {()=>{handleDeleteClick(card)}}
      ></button>
      <img className="card__img" src={card.link} alt={card.name}
        onClick = {()=>{handleClick(card)}}
      />
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__button">
          <button className={cardLikeButtonClassName}
            onClick={()=>{handleLikeClick(card)}}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;