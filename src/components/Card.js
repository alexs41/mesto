export default class Card {
    constructor(card, templateSelector, handleCardClick, user, api, popupConfirmDelete) {
        this.card = card;
        this._popupConfirmDelete = popupConfirmDelete;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.like-container__like-button');
        this._thashButton = this._element.querySelector('.element__trash-button');
        this._image = this._element.querySelector('.element__image');
        this._header = this._element.querySelector('.element__header');
        this._handleCardClick = handleCardClick;
        this._likeCounter = this._element.querySelector('.like-container__like-count');
        this._user = user;
        this._api = api;
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
    }
    _likeCard() {
        if (!this._likeButton.classList.contains('like-container__like-button_active')) {
            this._api.likeCard(this.card)
                .then(res => {
                    this.card = res;
                    this._likeButton.classList.add('like-container__like-button_active');
                    this._likeCounter.textContent = this.card.likes.length;
                })
                .catch(err => {
                    console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
                });
        } else {
            this._api.disLikeCard(this.card)
                .then(res => {
                    this.card = res;
                    this._likeButton.classList.remove('like-container__like-button_active');
                    this._likeCounter.textContent = this.card.likes.length;
                })
                .catch(err => {
                    console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
                });
        }
    }
    _deleteCard() {
        this._api.deleteCard(this.card._id)
            .then(() => {
                this._element.remove();
                this._element = null;
            })
            .catch(err => {
                console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
            });
    }
    _setEventListeners = () => {
        this._image.addEventListener("click", () => this._handleCardClick(this.card.name, this.card.link));
        this._likeButton.addEventListener('click', () => this._likeCard());
        if (this._thashButton) {
            this._thashButton.addEventListener('click', () => this._popupConfirmDelete.open(this._element, this.card));
        };
    }
    render = () => {
        this._image.src = this.card.link;
        this._image.alt = this.card.name;
        this._header.textContent= this.card.name;
        this._element.id = this.card._id;
        this._likeCounter.textContent = this.card.likes.length;
        this._setEventListeners();
        if (this.card.owner._id !== this._user.id) {
            this._thashButton.remove();
        };
        this.card.likes.some( (likeObj) => {
            if (likeObj._id == this._user.id) {
                this._likeButton.classList.add('like-container__like-button_active');
            }
        });
        return this._element;
    }
}