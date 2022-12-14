import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar, isLoading} = props;
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          ref={avatarRef}
          type="url" 
          className="popup__input popup__input_type_avatar" 
          id="avatar-input" 
          placeholder="Ссылка на картинку" 
          name="avatar" 
          required />
        <span className="popup__input-error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
