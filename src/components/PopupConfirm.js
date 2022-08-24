import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        // достаём все элементы полей
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
    }
  }