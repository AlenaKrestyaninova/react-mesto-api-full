import { BASE_URL } from './auth';

class Api {
    constructor({host, headers}){
        this._host = host;
        this._headers = headers;
    }

    /* Вернуть результат или ошибку*/
    _getJsonOrError(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    /* Получить изначальные карточки с сервера*/
    getCards(){
        return fetch(`${this._host}/cards`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Создать новую карточку*/
    createCard(cardObj){
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: cardObj.name,
                link: cardObj.link,
            })
        })
        .then(this._getJsonOrError)
    }

    /* Удалить карточку на сервере*/
    deleteCard(_id){
        return fetch(`${this._host}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Лайкнуть карточку на сервере*/
    likeCard(_id){
        return fetch(`${this._host}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Удалить лайк на сервере*/
    dislikeCard(_id) {
        return fetch(`${this._host}/cards/${_id}/likes`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        }).then(this._getJsonOrError);
    }

    /* Запросить данные о юзере*/
    getUserInfo(){
        return fetch(`${this._host}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._getJsonOrError)
    }

    /* Запостить данные о юзере*/
    setUserInfo(data){
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        })
        .then(this._getJsonOrError)
    }

    /* Запостить аватар*/
    setAvatar(avatar){
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(avatar),
        })
        .then(this._getJsonOrError)
    }

}

const api = new Api({
    host: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
    },
});

export default api;

/* Старый токен*/
// "c6a18f64-a17b-491d-a60f-79193e16e124"