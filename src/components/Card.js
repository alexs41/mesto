export default class Card {
    constructor(card, templateSelector, handleCardClick, user) {
        this.name = card.name;
        this.link = card.link;
        this._id = card._id;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.like-container__like-button');
        this._thashButton = this._element.querySelector('.element__trash-button');
        this._image = this._element.querySelector('.element__image');
        this._header = this._element.querySelector('.element__header');
        this._handleCardClick = handleCardClick;
        this._likes = card.likes.length;
        this._likeCounter = this._element.querySelector('.like-container__like-count');
        this._user = user;
        this._owner = card.owner;
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
        this._likeButton.classList.toggle('like-container__like-button_active');
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    _setEventListeners = () => {
        this._image.addEventListener("click", () => this._handleCardClick(this.name, this.link));
        this._likeButton.addEventListener('click', () => this._likeCard());
        if (!this._thashButton) {
            this._thashButton.addEventListener('click', () => this._deleteCard());
        };
    }
    render = () => {
        this._image.src = this.link;
        this._image.alt = this.name;
        this._header.textContent= this.name;
        this._element.id = this._id;
        this._likeCounter.textContent = this._likes;
        this._setEventListeners();
        // debugger;
        if (this._owner._id !== this._user.id) {
            this._thashButton.remove();
        } else {
            console.log(`Owner id ${this._owner._id} and User id ${this._user.id}`);
        };
        // debugger;
        return this._element;
    }
}