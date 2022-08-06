// import openPopup from "./popups";
export default class FormValidator {

    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }
   

    _showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
      };
      
    _hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    };
      
    _checkInputValidity = (formElement, inputElement, {...rest}) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
      } else {
        hideInputError(formElement, inputElement, rest);
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
      }
    };
      
    _hasInvalidInput = (inputList) => {
      // проходим по этому массиву методом some
      return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
      });
    };
      
    _toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
      // Если есть хотя бы один невалидный инпут
      if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(inactiveButtonClass);
      } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(inactiveButtonClass);
      }
    };

    _setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
        
        inputList.forEach((inputElement) => {
            checkInputValidity(formElement, inputElement, rest);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, rest);
        });
      
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, rest);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, rest);
          });
        });
    };
    
    enableValidation() {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        const formList = Array.from(document.querySelectorAll(formSelector));
        
        // Переберём полученную коллекцию
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
            });
            // Для каждой формы вызовем функцию setEventListeners,
            // передав ей элемент формы
            setEventListeners(formElement, rest);
        });
    };
    
}