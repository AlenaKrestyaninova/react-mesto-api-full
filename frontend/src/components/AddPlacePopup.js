import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useForm } from '../hooks/useForm.js'

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace, isLoading} = props;
  const {values, handleChange, setValues} = useForm({
    name: '',
    link: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ 
      name: values.name, 
      link: values.link });
  }

  React.useEffect(() => {
    setValues({name: '', link: ''})
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="popup__input popup__input_type_place" 
          id="place-input"
          value={values.name} 
          onChange={handleChange}
          placeholder="Название" 
          name="name" 
          required 
          minLength="2" 
          maxLength="30" />
        <span className="popup__input-error" id="place-input-error"></span>
        <input 
          type="url" 
          className="popup__input popup__input_type_image" 
          id="img-input"
          value={values.link} 
          onChange={handleChange}
          placeholder="Ссылка на картинку" 
          name="link" 
          required />
        <span className="popup__input-error" id="img-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
