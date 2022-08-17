import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const initialCards = [
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'  },
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'  },
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

const templateSelector = '.element_template';
const profileEditButton = document.querySelector('.profile-info-container__edit-button');
const addElementButton = document.querySelector('.profile__add-button');
const newElementName = document.querySelector('.form__input_element-name');
const newElementPictureLink = document.querySelector('.form__input_picture-link');
const formAddElement = document.querySelector('.form_add-element');

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

const initialCardsObj = initialCards.map( card => {
  return new Card(card.name, card.link, templateSelector, handleCardClick);
});

const cardsList = new Section({
    items: initialCardsObj,
    renderer: (item) => {
      // Тело функции renderer пока оставим пустым
      cardsList.addItem(item.render());
    },
  },
  '.elements'
);
cardsList.renderItems();

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const formValidProfile = new FormValidator(config, '.form_edit-profile');
const formValidCard = new FormValidator(config, '.form_add-element');

formValidProfile.enableValidation();
formValidCard.enableValidation();

const popupWithImage = new PopupWithImage('.popup_element-image');
popupWithImage.setEventListeners();

// созданиие popupEditProfile экземпляра класса PopupWithForm
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
  user.setUserInfo(popupEditProfile._getInputValues()); // получаем данные из формы и вставляем в профиль
  popupEditProfile.close();
});
popupEditProfile.setEventListeners(); // Установка слушаталей на popupEditProfile

const user = new UserInfo({ nameSelector: '.profile-text-info__full-name', infoSelector: '.profile-text-info__description' });

profileEditButton.addEventListener('click', function () {
  popupEditProfile.setInputValues('.form__input_full-name', '.form__input_description', { user: user.getUserInfo()} );
  popupEditProfile.open();
}); // обработчик на кнопку открытия попап редактирования профиля

// созданиие popupAddElement экземпляра класса PopupWithForm
const popupAddElement = new PopupWithForm('.popup_add-element', () => {
  cardsList.renderer(new Card(newElementName.value, newElementPictureLink.value, templateSelector, handleCardClick));
  popupAddElement.close();
  formAddElement.reset();
  formValidCard.enableValidation();
});
popupAddElement.setEventListeners(); // Установка слушаталей на popupAddElement

addElementButton.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formAddElement.reset();
  popupAddElement.open();
});