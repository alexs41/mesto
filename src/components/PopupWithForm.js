import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        // достаём все элементы полей
        this._inputList = this._form.querySelectorAll('.form__input');
        this._submitButton = this._form.querySelector('.form__submit-button');
    }
    getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }
    setInputValues(data) {
        this._inputList.forEach((input) => {
        // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
        input.value = data[input.name];
        });
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
    handleSaving() {
        this._submitButton.textContent = 'Сохранение...';
    }
    handleSavingComplete() {
        this._submitButton.textContent = 'Сохраненить';
    }
  }