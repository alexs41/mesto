import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor( popupSelector, imageURL, name ) {
        super(popupSelector);
        this._imageUrl = imageURL;
        this._name = name;

        // this._popupElementImage = document.querySelector('.popup_element-image');
        this._figureImage = this._popupElementImage.querySelector('.figure__image');
        this._figureCaption = this._popupElementImage.querySelector('.figure__caption');
    }

    open() {
        this._figureCaption.textContent = this._name;
        this._figureImage.src = this._imageUrl;
        this._figureImage.alt = this._name;
        super.open();
    }
  }