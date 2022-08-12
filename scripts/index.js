import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//-------------- старые переменные
const cardsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element_template").content;
//----------------
const profileEditButton = document.querySelector('.profile-info-container__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');

const popupAddElement = document.querySelector('.popup_add-element');

const addElementButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const newElementName = document.querySelector('.form__input_element-name');
const newElementPictureLink = document.querySelector('.form__input_picture-link');
const fullName = document.querySelector('.form__input_full-name');
const description = document.querySelector('.form__input_description');
const formEditProfile = document.querySelector('.form_edit-profile');
const formAddElement = document.querySelector('.form_add-element');
const profileFullName = document.querySelector('.profile-text-info__full-name');
const profileDescription= document.querySelector('.profile-text-info__description');

fullName.value = profileFullName.textContent;
description.value = profileDescription.textContent;
//----------------------------
var createCard = null;

initialCards.forEach((card, index) => {
  createCard = new Card(card.name, card.link, elementTemplate, openPopup);
  createCard.render(cardsContainer);
  createCard = null;
});

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
};

const formValidProfile = new FormValidator(config, '.form_edit-profile');
const formValidCard = new FormValidator(config, '.form_add-element');

formValidProfile.enableValidation();
formValidCard.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopupEsc(e) {
  if (e.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}


function openPopupEditProfile() {

  openPopup(popupEditProfile); //вызываем функцию для открытия попапа 
}

function handleProfileFormSubmit() {
  profileFullName.textContent = fullName.value;
  profileDescription.textContent = description.value;
  closePopup(popupEditProfile);
}


addElementButton.addEventListener('click', function () {
  formAddElement.reset();
  

  openPopup(popupAddElement);
});

function addElementFromPopup() {
  createCard = new Card(newElementName.value, newElementPictureLink.value, elementTemplate, openPopup);
  createCard.render(cardsContainer);
  createCard = null;
  closePopup(popupAddElement);
  formAddElement.reset();
}

profileEditButton.addEventListener('click', function () {
    openPopupEditProfile();
}); // обработчик на кнопку открытия попап редактирования профиля

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

popups.forEach( popup => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
      closePopup(popup); 
    }; 
  }); 
}); // обработчик на кнопки закрытия поп-ап и темной области поп-ап

formAddElement.addEventListener('submit', addElementFromPopup); // обработчик на кнопку сохранения добавленного элемента