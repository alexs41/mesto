const button = document.querySelector('.profile-info-container__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function openPopup() {
    popup.classList.add('popup_opened');
    fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
    description.value = document.querySelector('.profile-text-info__description').textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

button.addEventListener('click', function () {
    openPopup();
});

popupCloseButton.addEventListener('click', function () {
    closePopup();
});

popup.addEventListener('click', function (e) {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    });

let fullName = document.querySelector('.form-edit-profile__input_full-name');
let description = document.querySelector('.form-edit-profile__input_description');
const submitButton = document.querySelector('.form-edit-profile__submit-button');

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