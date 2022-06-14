const button = document.querySelector('.profile-info-container__edit-button');
const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');
const addElementPopup = document.querySelector('.add-element-popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const addElementButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

function openPopup() {
    popup.classList.add('popup_opened');
    fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
    description.value = document.querySelector('.profile-text-info__description').textContent;
}

function closePopup() {
    let popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
}

//------------------------ addElementButton start
function openAddElementPopup() {
    addElementPopup.classList.add('popup_opened');
}
addElementButton.addEventListener('click', function () {
    openAddElementPopup();
});
//------------------------ addElementButton end

button.addEventListener('click', function () {
    openPopup();
});

// popupCloseButton.addEventListener('click', function () {
//     closePopup();
// });

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        closePopup();
    });
});

// старая функция закрытия POPUP по клику на черный экран
// popup.addEventListener('click', function (e) {
//         if (e.target === e.currentTarget) {
//             closePopup();
//         }
//     });
popups.forEach(function(popup) {
    popup.addEventListener('click', function (e) {
             if (e.target === e.currentTarget) {
        closePopup();
        };
    });
});



let fullName = document.querySelector('.form__input_full-name');
let description = document.querySelector('.form__input_description');
const submitButton = document.querySelector('.form__submit-button');

function saveButtonAction() {
    document.querySelector('.profile-text-info__full-name').textContent = fullName.value;
    document.querySelector('.profile-text-info__description').textContent = description.value;
    closePopup();
}

submitButton.addEventListener('click', saveButtonAction);

const likeButtons = Array.from(document.querySelectorAll('.element__like-button'));

likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle('element__like-button_active');
    });
  });