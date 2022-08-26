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

profileEditButton.addEventListener('click', function () {
  popupEditProfile.setInputValues(user.getUserInfo());
  popupEditProfile.open();
}); // обработчик на кнопку открытия попап редактирования профиля

// созданиие popupEditProfile экземпляра класса PopupWithForm
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
  popupEditProfile.handleSaving();
  const inputValuesObj = popupEditProfile.getInputValues();
  api.editUser(inputValuesObj)
    .then(userData => {
      // получаем данные из формы и вставляем в профиль
      user.setUserInfo(userData);
      popupEditProfile.close();
      formValidProfile.resetValidation();
    })
    .catch(err => console.error('Произошла ошибка!', err))
    .finally(() => popupEditProfile.handleSavingComplete());
});
popupEditProfile.setEventListeners(); // Установка слушаталей на popupEditProfile

//----------------------  СОЗДАНИЕ КАРТОЧЕК --------- НАЧАЛО


function createCard(card) {
  return new Card(card, templateSelector, handleCardClick, user, api, popupConfirmDelete).render();
}
let initialCardsObj = [];
let cardsList = undefined;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    // тут установка данных пользователя
    user.setUserInfo(userData);
    // и тут отрисовка карточек
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
  })
  .catch(err => console.error('Произошла ошибка!', err));

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
const popupAddElement = new PopupWithForm('.popup_add-element', () => {
    popupAddElement.handleSaving();
    const inputValuesObj = popupAddElement.getInputValues();
    api.addCard(inputValuesObj)
      .then(newCard => {
        // отрисовываем и добавляем карточку
        cardsList.renderer(createCard(newCard));
        popupAddElement.close();
      })
      .catch(err => console.error('Произошла ошибка!', err))
      .finally(() => popupAddElement.handleSavingComplete());
});

popupAddElement.setEventListeners(); // Установка слушаталей на popupAddElement
addElementButton.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formValidCard.resetValidation()
  popupAddElement.open();
});

//------------------------ popupEditAvatar --------------------------
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', () => {
    popupEditAvatar.handleSaving();
    const inputValuesObj = popupEditAvatar.getInputValues();
    api.editAvatar(inputValuesObj)
      .then(userData => {
        // получаем данные userData на страницу
        user.setUserInfo(userData);
        popupEditAvatar.close();
      })
      .catch(err => console.error('Произошла ошибка!', err))
      .finally(() => popupEditAvatar.handleSavingComplete());
});
popupEditAvatar.setEventListeners(); // Установка слушаталей на popupAddElement

avatar.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formValidAvatar.resetValidation()
  popupEditAvatar.open();
});