const button = document.querySelector('.profile-info-container__edit-button');
const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');
const addElementPopup = document.querySelector('.popup_add-element');
const popupCloseButton = document.querySelector('.popup__close-button');
const addElementButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const elementTrashButtons = document.querySelectorAll('.element__trash-button');

const newElementName = document.querySelector('.form__input_element-name');
const newElementPictureLink = document.querySelector('.form__input_picture-link');

const elementImages = document.querySelectorAll('.element__image');
const popupElementImage = document.querySelector('.popup_element-image');

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element_template").content;

//----------------- ПРОФИЛЬ ----------------------
function openPopup() {
    popup.classList.add('popup_opened');
    fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
    description.value = document.querySelector('.profile-text-info__description').textContent;
}

function closePopup() {
    let popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
}

button.addEventListener('click', function () {
    openPopup();
}); // обработчик на кнопку открытия попап редактирования профиля

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        closePopup();
    });
}); // обработчик на все кнопки закрытия попап

let fullName = document.querySelector('.form__input_full-name');
let description = document.querySelector('.form__input_description');
const submitButton = document.querySelector('.form__submit-button');

function saveButtonAction() {
    document.querySelector('.profile-text-info__full-name').textContent = fullName.value;
    document.querySelector('.profile-text-info__description').textContent = description.value;
    closePopup();
}

submitButton.addEventListener('click', saveButtonAction); // Обработчик на кнопку сохранения информации о профиле

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

    newElement.querySelector('.element__header').innerText = card.name; // заполняем заголовок
    newElement.querySelector('.element__image').src = card.link; // заполняем ссылку на фото

    newElement.querySelector('.element__trash-button').addEventListener('click', () => {
		newElement.closest('.element').remove();
	}); // вешаем обработчик на кнопку удаления

    newElement.querySelector('.element__like-button').addEventListener('click', () => {
		newElement.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }); // вешаем обработчик на кнопку Like

    newElement.querySelector('.element__image').addEventListener("click", () => {
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


elementTrashButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        button.closest('.element').remove();
    });
});

popups.forEach(function(popup) {
    popup.addEventListener('click', function (e) {
             if (e.target === e.currentTarget) {
        closePopup();
        };
    });
}); // обрабоатчик на клик по темной области поп-ап для его закрытия

const submitButtonAddElement = document.querySelector(".form__submit-button_add-element");

submitButtonAddElement.addEventListener('click', () => {
            const element = {
                name: undefined,
                link: undefined
            };
            // element.name = 'Заголовок фото';
            // element.link = 'ссылка на фото';

            element.name = document.querySelector('.form__input_element-name').value;
            element.link = document.querySelector('.form__input_picture-link').value;
            createElement(element);
         }); // обработчик на кнопку сохранения добавленного элемента

function openPopupElementImage(image) {
    popupElementImage.classList.add('popup_opened');
    const elementHeader = image.closest('.element').querySelector('.element__header').textContent;
    popupElementImage.querySelector('.figure__caption').innerText = elementHeader;
    popupElementImage.querySelector('.figure__image').src = image.src;
};