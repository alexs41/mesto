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

fullName.value = profileFullName.textContent;
description.value = profileDescription.textContent;

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
  // fullName.value = profileFullName.textContent;
  // description.value = profileDescription.textContent; //заполняем поля формы 
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