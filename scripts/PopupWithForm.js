import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor( popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = super._popup.querySelector('.form');

    }

    _getInputValues() {
        //собирает данные всех полей формы
        return Array.from(this._form.querySelectorAll('.form__input')); // соберем массив инпутов

    }

    setEventListeners() {
        // добавляем обрабочик клика на крестик и темную область
        super.setEventListeners();
        // добавляем обработчик на сабмит формы
        this._form.addEventListener('submit', this._submitCallback);
    }

    close() {
        // закрыть попап
        super.close();
        // сбросить форму
        this._formAddElement.reset();
    }
  }