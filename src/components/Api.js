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
}