export default class FormValidator {

  constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;

      this._formElement = document.querySelector(formElement);
      this._inputList_test = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  
  _setEventListeners = () => {
    const showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };
    
    const hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };
    
    const checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
      } else {
        hideInputError(inputElement);
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
      }
    };
    
    const hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
      return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
      });
    };
    
    const toggleButtonState = (inputList, buttonElement) => {
      // Если есть хотя бы один невалидный инпут
      if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(this._inactiveButtonClass);
      } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(this._inactiveButtonClass);
      }
    };

    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement);
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    
    this._setEventListeners();
  };
    
}