export default class Card {

    constructor(name, link, template, openPopup) {
        this.name = name;
        this.link = link;
        this.template = template;
        this._element = this.template.cloneNode(true).children[0];
        this._likeButton = this._element.querySelector('.element__like-button');
        this._thashButton = this._element.querySelector('.element__trash-button');
        this._image = this._element.querySelector('.element__image');
        this._header = this._element.querySelector('.element__header');
        this._openPopup = openPopup;
    }
    
    _likeCard() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _viewCard() {
        const popupElementImage = document.querySelector('.popup_element-image');
        const _FigureImage = popupElementImage.querySelector('.figure__image');
        const _FigureCaption = popupElementImage.querySelector('.figure__caption');

        this._openPopup(popupElementImage);
        _FigureCaption.textContent = this.name;
        _FigureImage.src = this.link;
        _FigureImage.alt = this.name;
    }

    _setEventListeners = () => {
        this._image.addEventListener("click", () => this._viewCard(this.name, this.link));
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._thashButton.addEventListener('click', () => this._deleteCard());
    }

    render = (cardsContainer) => {
        this._image.src = this.link;
        this._image.alt = this.name;
        this._header.textContent= this.name;
        this._setEventListeners();
        cardsContainer.prepend(this._element);
    }
}