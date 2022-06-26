const profileEditButton = document.querySelector('.profile-info-container__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');

const popupOpened = document.querySelector('.popup_opened');
const popupAddElement = document.querySelector('.popup_add-element');

const popupCloseButton = document.querySelector('.popup__close-button');
const addElementButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const newElementName = document.querySelector('.form__input_element-name');
const newElementPictureLink = document.querySelector('.form__input_picture-link');

const elementImages = document.querySelectorAll('.element__image');
const popupElementImage = document.querySelector('.popup_element-image');
const popupElementImageFigureImage = popupElementImage.querySelector('.figure__image');
const popupElementImageFigureCaption = popupElementImage.querySelector('.figure__caption');

const cardsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element_template").content;

const fullName = document.querySelector('.form__input_full-name');
const description = document.querySelector('.form__input_description');
const submitButtonFormEditProfile = document.querySelector('.form__submit-button_edit-profile');
const submitButtonAddElement = document.querySelector(".form__submit-button_add-element");

const formEditProfile = document.querySelector('.form_edit-profile');
const formAddElement = document.querySelector('.form_add-element');

const profileFullName = document.querySelector('.profile-text-info__full-name');
const profileDescription= document.querySelector('.profile-text-info__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile() { 
  fullName.value = profileFullName.textContent;
  description.value = profileDescription.textContent; //заполняем поля формы 
  openPopup(popupEditProfile); //вызываем функцию для открытия попапа 
}

function submitButtonEditProfileAction() {
  profileFullName.textContent = fullName.value;
  profileDescription.textContent = description.value;
  closePopup(popupEditProfile);
}

function createElement(card) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true); // скопировали шаблон
    const newElementImage = newElement.querySelector('.element__image');
    newElement.querySelector('.element__header').textContent = card.name;
     // заполняем заголовок
    newElementImage.src = card.link; // заполняем ссылку на фото
    newElementImage.alt =  card.name; // заполняем alt у изображения

    newElement.querySelector('.element__trash-button').addEventListener('click', () => {
      newElement.closest('.element').remove();
    }); // вешаем обработчик на кнопку удаления

    newElement.querySelector('.element__like-button').addEventListener('click', () => {
      newElement.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }); // вешаем обработчик на кнопку Like

    newElementImage.addEventListener("click", () => {
        openPopupElementImage(card.name, card.link);
    }); // вешаем обработчик на изображение

    return(newElement);
}

function addElement(card) {
  cardsContainer.prepend(card);
}

initialCards.forEach((card, index) => {
  addElement(createElement(card));
});

addElementButton.addEventListener('click', function () {
  formAddElement.reset();
  openPopup(popupAddElement);
});

function addElementFromPopup() {
  const element = {};
  element.name = newElementName.value;
  element.link = newElementPictureLink.value;
  addElement(createElement(element));
  closePopup(popupAddElement);
}

function openPopupElementImage(cardName, imageLink) {
  openPopup(popupElementImage);
  popupElementImageFigureCaption.textContent = cardName;
  popupElementImageFigureImage.src = imageLink;
  popupElementImageFigureImage.alt = cardName;
};

profileEditButton.addEventListener('click', function () {
    openPopupEditProfile();
}); // обработчик на кнопку открытия попап редактирования профиля

formEditProfile.addEventListener('submit', submitButtonEditProfileAction);

popups.forEach( popup => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
      closePopup(popup); 
    }; 
  }); 
}); // обработчик на кнопки закрытия поп-ап и темной области поп-ап

formAddElement.addEventListener('submit', addElementFromPopup); // обработчик на кнопку сохранения добавленного элемента

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}; 
//--------------------------------- ВАЛИДАЦИЯ ФОРМ ------------------------------------

// const form = document.querySelector('.form');
// const formInput = form.querySelector('.form__input');
// const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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
    buttonElement.classList.add('form__submit-button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__submit-button_inactive');
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};
// Вызовем функцию
enableValidation();