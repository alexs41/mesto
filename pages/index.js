import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  config,
  templateSelector,
  profileEditButton,
  addElementButton,
  inputElementName,
  inputPictureLink,
} from '../utils/constants.js';


function createCard(name, link) {
  return new Card(name, link, templateSelector, handleCardClick);
}

const initialCardsObj = initialCards.map( card => {
  return createCard(card.name, card.link);
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

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

cardsList.renderItems();

const formValidProfile = new FormValidator(config, '.form_edit-profile');
const formValidCard = new FormValidator(config, '.form_add-element');

formValidProfile.enableValidation();
formValidCard.enableValidation();

const popupWithImage = new PopupWithImage('.popup_element-image');
popupWithImage.setEventListeners();

// созданиие popupEditProfile экземпляра класса PopupWithForm
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
  user.setUserInfo(popupEditProfile.getInputValues()); // получаем данные из формы и вставляем в профиль
  popupEditProfile.close();
});
popupEditProfile.setEventListeners(); // Установка слушаталей на popupEditProfile

const user = new UserInfo({ nameSelector: '.profile-text-info__full-name', infoSelector: '.profile-text-info__description' });

profileEditButton.addEventListener('click', function () {
  popupEditProfile.setInputValues(user.getUserInfo());
  popupEditProfile.open();
}); // обработчик на кнопку открытия попап редактирования профиля

// созданиие popupAddElement экземпляра класса PopupWithForm
const popupAddElement = new PopupWithForm('.popup_add-element', () => {
  cardsList.renderer(createCard(inputElementName.value, inputPictureLink.value));
  popupAddElement.close();
  formValidCard.resetValidation();
});
popupAddElement.setEventListeners(); // Установка слушаталей на popupAddElement

addElementButton.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  popupAddElement.open();
});