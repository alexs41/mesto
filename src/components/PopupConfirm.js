import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        this.card = {};
        // достаём все элементы полей
    }
    setEventListeners() {
        // добавляем обрабочик клика на крестик и темную область
        super.setEventListeners();
        // добавляем обработчик на сабмит формы
        this._form.addEventListener('submit', this._submitCallback);
    }
    open = (element, card) => {
        super.open();
        this.card = card;
        this.element = element;
    }
  }