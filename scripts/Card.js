export default class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this.name = name;
        this.link = link;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__like-button');
        this._thashButton = this._element.querySelector('.element__trash-button');
        this._image = this._element.querySelector('.element__image');
        this._header = this._element.querySelector('.element__header');
        // this._openPopup = openPopup;

        this._popupElementImage = document.querySelector('.popup_element-image');
        this._figureImage = this._popupElementImage.querySelector('.figure__image');
        this._figureCaption = this._popupElementImage.querySelector('.figure__caption');
        this._handleCardClick = handleCardClick;
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
        this._likeButton.classList.toggle('element__like-button_active');
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    _setEventListeners = () => {
        this._image.addEventListener("click", () => this._handleCardClick(this.name, this.link));
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._thashButton.addEventListener('click', () => this._deleteCard());
    }
    render = () => {
        this._image.src = this.link;
        this._image.alt = this.name;
        this._header.textContent= this.name;
        this._setEventListeners();
        return this._element;
    }
}