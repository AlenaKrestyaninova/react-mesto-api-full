import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail]  = React.useState('');
  const [isRegisterOk, setIsRegisterOk]  = React.useState(false);
  const navigate = useNavigate();
  

  const handleLogin = (email, password) =>{
    return auth.authorize(email, password)
      .then((data) => {
        setEmail(email);
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleRegister = (email, password) =>{
    return auth.register(email, password)
      .then(() =>{
        navigate('/sign-in');
        setIsRegisterOk(true);
        setIsInfoTooltipOpen(true);
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogout = () => {
    if (!localStorage.getItem('jwt')) return;
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/sign-in');
  };

  React.useEffect(() => {
    const tokenCheck = () => {
      if(!localStorage.getItem('jwt')) return;
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch(err => {
          console.log(err);
        })
    };
    tokenCheck()
  }, [])

  // Эффект закрытия попапа по эскейпу будет реализован позднее
  // const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltipOpen || selectedCard.link;
  // React.useEffect(() => {
  //   function closeByEscape(evt) {
  //     if(evt.key === 'Escape') {
  //       closeAllPopups();
  //     }
  //   }
  //   if(isOpen) {
  //     document.addEventListener('keydown', closeByEscape);
  //     return () => {
  //       document.removeEventListener('keydown', closeByEscape);
  //     }
  //   }
  // }, [isOpen]);

  React.useEffect(()=>{
    if(loggedIn){
      api.getUserInfo()
        .then(userInfo => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  React.useEffect(()=>{
    if (loggedIn){
      api.getCards()
        .then(cards => { 
          setCards(cards)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleUpdateUser(currentUser){
    setIsLoading(true);
    api.setUserInfo(currentUser)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(currentUser){
    setIsLoading(true);
    api.setAvatar(currentUser)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(newCard){
    setIsLoading(true);
    api.createCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked){
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }
  };

  function handleCardDelete(card){
    api.deleteCard(card._id)
      .then(()=>
        setCards((state) => state.filter((c) => c._id !== card._id))
      )
      .catch((err) => console.log(err))
  };

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({link: '', name: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            email={email}
            onLogout={handleLogout}
            loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route path="/" element={
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }>
                
              </Route>
            </Route>

            
            <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin}/>} />
            <Route path="*" element={loggedIn ? <Navigate replace to="/" /> : <Navigate replace to="/sign-up" />} />
          </Routes>
          
          <Footer />

          <InfoTooltip
            registerOk={isRegisterOk}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}/>
          
          <PopupWithForm
            name={'delete'}
            title={'Вы уверены?'}
            buttonText={'Да'}
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
