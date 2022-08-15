import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor( popupSelector ) {
        super(popupSelector);

        // this._popupElementImage = document.querySelector('.popup_element-image');
        this._figureImage = this._popup.querySelector('.figure__image');
        this._figureCaption = this._popup.querySelector('.figure__caption');
    }

    open(name, imageUrl) {
        this._figureCaption.textContent = name;
        this._figureImage.src = imageUrl;
        this._figureImage.alt = name;
        super.open();
    }
  }