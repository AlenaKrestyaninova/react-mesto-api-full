import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const {onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, onCardDelete, cards} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar"
          onClick={onEditAvatar}>
          <img className="profile__avatar-img" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__edit"
            onClick={onEditProfile}>
          </button>
        </div>
        <button className="profile__add"
          onClick={onAddCard}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                card={card}
              />            
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;