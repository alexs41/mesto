export default class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }
    async getUser() {
        try {
            const response = await fetch(`${this._url}/users/me`, {
                headers: this._headers
            })
            return response.json()
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async editUser(user) {
        try {
            const response = await fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                  name: user.name,
                  about: user.about
                })
              });
            return response.json()
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async getInitialCards() {
        try {
            const response = await fetch(`${this._url}/cards`, {
                headers: this._headers
            })
            return response.json()
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async addCard(card) {
        try {
            const response = await fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                  name: card.name,
                  link: card.link
                })
              });
            return response.json()
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async deleteCard(cardId) {
        try {
            const response = await fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
              });
              if (response.ok) {
                return cardId;
              }
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async likeCard(card) {
        try {
            const response = await fetch(`${this._url}/cards/${card._id}/likes`, {
                method: 'PUT',
                headers: this._headers,
              });
              if (response.ok) {
                return response.json();
              }
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
    async disLikeCard(card) {
        try {
            const response = await fetch(`${this._url}/cards/${card._id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
              });
              if (response.ok) {
                return response.json();
              }
        }   catch (err) {
            console.error('Произошла ошибка!', err);
        }
    }
}