export default class Popup {

    constructor( popupSelector ) {
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add('popup_opened');
    }
    close() {
        this._popup.classList.remove('popup_opened');
    }
    _handleEscClose = (e) => {
        if (e.key === 'Escape') {
            this._popup.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => { 
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
                this._popup.close(); 
            }; 
          }); // обработчик на кнопки закрытия поп-ап и темной области поп-ап
    }
}