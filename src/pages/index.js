import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  config,
  templateSelector,
  profileEditButton,
  addElementButton,
  apiConfig,
  avatar,
} from '../utils/constants.js';

const api = new Api(apiConfig);

//----------------------  РЕДАКТИРОВАНИЕ ПРОФИЛЯ --------- НАЧАЛО
const user = new UserInfo({ nameSelector: '.profile-text-info__full-name', infoSelector: '.profile-text-info__description', avatarSelector: '.profile-info__avatar' });

(async function () {
    user.setUserInfo(await api.getUser());
})();

profileEditButton.addEventListener('click', function () {
  popupEditProfile.setInputValues(user.getUserInfo());
  popupEditProfile.open();
}); // обработчик на кнопку открытия попап редактирования профиля

// созданиие popupEditProfile экземпляра класса PopupWithForm
const popupEditProfile = new PopupWithForm('.popup_edit-profile', async () => {
  
  try {
    popupEditProfile.handleSaving();
    const inputValuesObj = popupEditProfile.getInputValues();
    user.setUserInfo(await api.editUser(inputValuesObj));
    // получаем данные из формы и вставляем в профиль
    popupEditProfile.close();
    popupEditProfile.handleSavingComplete();
    formValidProfile.resetValidation();
  } catch (err) {
    console.error('Произошла ошибка!', err);
  }
  
});
popupEditProfile.setEventListeners(); // Установка слушаталей на popupEditProfile

//----------------------  СОЗДАНИЕ КАРТОЧЕК --------- НАЧАЛО
function createCard(card) {
  return new Card(card, templateSelector, handleCardClick, user, api, popupConfirmDelete).render();
}
let initialCardsObj = [];
let cardsList = undefined;

(async function () {
  try {
    const initialCards = (await api.getInitialCards());
    initialCardsObj = initialCards.map( card => {
      return createCard(card);
    });
    initialCardsObj = initialCardsObj.reverse();
    cardsList = new Section({
        items: initialCardsObj,
        renderer: (item) => {
          cardsList.addItem(item);
        },
      },
      '.elements'
    );
    cardsList.renderItems();
  } catch (err) {
    console.error('Произошла ошибка!', err);
  }
})();
//----------------------  СОЗДАНИЕ КАРТОЧЕК --------- КОНЕЦ

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

const formValidProfile = new FormValidator(config, '.form_edit-profile');
const formValidCard = new FormValidator(config, '.form_add-element');
const formValidAvatar = new FormValidator(config, '.form_edit-avatar');
const formValidConfirm = new FormValidator(config, '.form_confirm-delete');

formValidProfile.enableValidation();
formValidCard.enableValidation();
formValidAvatar.enableValidation();
formValidConfirm.enableValidation();

//------------------------ popupWithImage --------------------------
const popupWithImage = new PopupWithImage('.popup_element-image');
popupWithImage.setEventListeners();

//------------------------ popupConfirmDelete --------------------------
const popupConfirmDelete = new PopupConfirm('.popup_confirm', () => {
    api.deleteCard(popupConfirmDelete.card._id);
      popupConfirmDelete.element.remove();
      popupConfirmDelete.element = null;
      popupConfirmDelete.close();
});
popupConfirmDelete.setEventListeners(); // Установка слушаталей на popupAddElement

//------------------------ popupAddElement --------------------------
const popupAddElement = new PopupWithForm('.popup_add-element', async () => {
  try {
    popupAddElement.handleSaving();
    const inputValuesObj = popupAddElement.getInputValues();
    const newCard = await api.addCard(inputValuesObj);
    cardsList.renderer(createCard(newCard));
    popupAddElement.close();
    popupAddElement.handleSavingComplete();
  } catch (err) {
    console.error('Произошла ошибка!', err);
  }
});
popupAddElement.setEventListeners(); // Установка слушаталей на popupAddElement
addElementButton.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formValidCard.resetValidation()
  popupAddElement.open();
});

//------------------------ popupEditAvatar --------------------------
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', async () => {
  try {
    popupEditAvatar.handleSaving();
    const inputValuesObj = popupEditAvatar.getInputValues();
    
    user.setUserInfo(await api.editAvatar(inputValuesObj));
    // получаем данные из формы и вставляем в профиль
    popupEditAvatar.close();
    popupEditAvatar.handleSavingComplete();
  } catch (err) {
    console.error('Произошла ошибка!', err);
  }
  
});
popupEditAvatar.setEventListeners(); // Установка слушаталей на popupAddElement

avatar.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formValidAvatar.resetValidation()
  popupEditAvatar.open();
});