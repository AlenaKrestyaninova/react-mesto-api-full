import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useForm } from '../hooks/useForm.js'

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser, isLoading} = props;
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({
    name: '',
    about: ''
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ 
      name: values.name, 
      about: values.about });
  } 

  React.useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about}); 
  }, [currentUser, isOpen]); 

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="popup__input popup__input_type_name" 
          id="name-input"
          value={values.name || ''} 
          onChange={handleChange}
          placeholder="Имя" 
          name="name" 
          required minLength="2" 
          maxLength="40" />
        <span className="popup__input-error" id="name-input-error"></span>
        <input 
          type="text" 
          className="popup__input popup__input_type_about" 
          id="about-input" 
          value={values.about || ''} 
          onChange={handleChange}
          placeholder="Род занятий" 
          name="about" 
          required minLength="2" 
          maxLength="200" />
        <span className="popup__input-error" id="about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
