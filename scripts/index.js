const profileEditButton = document.querySelector('.profile-info-container__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');

const popupOpened = document.querySelector('.popup_opened');
const addElementPopup = document.querySelector('.popup_add-element');

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

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element_template").content;

//----------------- ПРОФИЛЬ ----------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile() { 
  fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
  description.value = document.querySelector('.profile-text-info__description').textContent; //заполняем поля формы 
  openPopup(popupEditProfile); //вызываем функцию для открытия попапа 
}

// function openPopup() {
//     popupEditProfile.classList.add('popup_opened');
//     fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
//     description.value = document.querySelector('.profile-text-info__description').textContent;
// }

// function closePopup() {
//     let popupOpened = document.querySelector('.popup_opened');
//     popupOpened.classList.remove('popup_opened');
//     newElementName.removeEventListener('keypress', addElementEnter);
//     newElementPictureLink.removeEventListener('keypress', addElementEnter);
// }

profileEditButton.addEventListener('click', function () {
    openPopupEditProfile();
}); // обработчик на кнопку открытия попап редактирования профиля

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        closePopup(button.closest('.popup_opened'));
    });
}); // обработчик на все кнопки закрытия попап

const fullName = document.querySelector('.form__input_full-name');
const description = document.querySelector('.form__input_description');
const submitButtonFormEditProfile = document.querySelector('.form__submit-button_edit-profile');

function submitButtonEditProfileAction() {
    const inputFullName = document.querySelector('.profile-text-info__full-name');
    const inputDescription = document.querySelector('.profile-text-info__description');
    inputFullName.textContent = fullName.value;
    inputDescription.textContent = description.value;
    closePopup(popupEditProfile);
}

// submitButtonFormEditProfile.addEventListener('click', submitButtonEditProfileAction); // Обработчик на кнопку сохранения информации о профиле
const formEditProfile = document.querySelector('.form__edit-profile');
formEditProfile.addEventListener('submit', submitButtonEditProfileAction);
//----------------- КАРТОЧКИ ----------------------
// создание начальных карточек
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
        openPopupElementImage(newElement.querySelector('.element__image'));
    }); // вешаем обработчик на изображение

    elements.insertAdjacentElement('afterbegin', newElement); // добавляем элемент на страницу 
}

initialCards.forEach((card, index) => {
    createElement(card);
  });

//------------------------ addElementButton start
function openAddElementPopup() {
    addElementPopup.classList.add('popup_opened');
    newElementName.value = '';
    newElementPictureLink.value = '';
}

addElementButton.addEventListener('click', function () {
    openAddElementPopup();
});
//------------------------ addElementButton end


popups.forEach(function(popup) {
    popup.addEventListener('click', function (e) {
             if (e.target === e.currentTarget) {
        closePopup();
        };
    });
}); // обработчик на клик по темной области поп-ап для его закрытия

const submitButtonAddElement = document.querySelector(".form__submit-button_add-element");

function addElement() {
  const element = {};

  element.name = newElementName.value;
  element.link = newElementPictureLink.value;
  createElement(element);
  closePopup(addElementPopup);
}

const formAddElement = document.querySelector('.form_add-element');
formAddElement.addEventListener('submit', addElement); // обработчик на кнопку сохранения добавленного элемента

function openPopupElementImage(image) {
    popupElementImage.classList.add('popup_opened');
    const elementHeader = image.closest('.element').querySelector('.element__header').textContent;
    popupElementImageFigureCaption.innerText = elementHeader;
    popupElementImageFigureImage.src = image.src;
    popupElementImageFigureImage.alt = image.alt;
};