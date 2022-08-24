import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  // initialCards,
  config,
  templateSelector,
  profileEditButton,
  addElementButton,
  inputElementName,
  inputPictureLink,
  apiConfig,
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
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
  const inputValuesObj = popupEditProfile.getInputValues();
  (async function () {
    user.setUserInfo(await api.editUser(inputValuesObj));
    
  })();// получаем данные из формы и вставляем в профиль
  popupEditProfile.close();
  formValidProfile.resetValidation();
});
popupEditProfile.setEventListeners(); // Установка слушаталей на popupEditProfile

//----------------------  РЕДАКТИРОВАНИЕ ПРОФИЛЯ --------- КОНЕЦ
//----------------------  СОЗДАНИЕ КАРТОЧЕК --------- НАЧАЛО

function createCard(card) {
  return new Card(card, templateSelector, handleCardClick).render();
}

let initialCardsObj = [];

let cardsList = undefined;

(async function () {
  try {
    const initialCards = (await api.getInitialCards());
    initialCardsObj = initialCards.map( card => {
      return createCard(card);
    });
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

})()
//----------------------  СОЗДАНИЕ КАРТОЧЕК --------- КОНЕЦ

const testCard = { name: 'Lake 13', link: 'https://oir.mobi/uploads/posts/2021-06/thumbs/1622874619_38-oir_mobi-p-shedevri-prirodi-priroda-krasivo-foto-40.jpg'};
// api.addCard(testCard);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};


const formValidProfile = new FormValidator(config, '.form_edit-profile');
const formValidCard = new FormValidator(config, '.form_add-element');

formValidProfile.enableValidation();
formValidCard.enableValidation();

const popupWithImage = new PopupWithImage('.popup_element-image');
popupWithImage.setEventListeners();

// созданиие popupAddElement экземпляра класса PopupWithForm
const popupAddElement = new PopupWithForm('.popup_add-element', async () => {
  
  const newCard = await api.addCard(testCard);
  cardsList.renderer(createCard(newCard));
  popupAddElement.close();
});

popupAddElement.setEventListeners(); // Установка слушаталей на popupAddElement

addElementButton.addEventListener('click', function () { // обработчик на кнопку форму добавления элемента
  formValidCard.resetValidation()
  popupAddElement.open();
});
