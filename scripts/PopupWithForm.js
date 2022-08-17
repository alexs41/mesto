import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
    }
    _getInputValues() {
        //собирает данные всех полей формы
        return Array.from(this._form.querySelectorAll('.form__input'), inputElement => inputElement.value); // соберем массив инпутов
    }
    setInputValues(nameInputSelector, infoInputSelector, { user } ) {
        this._form.querySelector(nameInputSelector).value = user.name;
        this._form.querySelector(infoInputSelector).value = user.info;
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
        this._form.reset();
    }
  }