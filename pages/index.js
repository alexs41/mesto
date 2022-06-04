const button = document.querySelector('.profile-info-container__editButton');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

function openPopup() {
    popup.classList.add('popup_opened');
    // document.addEventListener('keypress', closePopupOnQ);
    fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
    description.value = document.querySelector('.profile-text-info__description').textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
    // document.removeEventListener('keypress', closePopupOnQ);
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

// --------------------------------------------
let fullName = document.querySelector('.form-edit-profile__full-name');
let description = document.querySelector('.form-edit-profile__description');
const submitButton = document.querySelector('.form-edit-profile__submit-button');



function saveButtonAction() {
    document.querySelector('.profile-text-info__full-name').textContent = fullName.value;
    document.querySelector('.profile-text-info__description').textContent = description.value;
    closePopup();
}

submitButton.addEventListener('click', saveButtonAction);
// --------------------------------------------

const likeButtons = Array.from(document.querySelectorAll('.element__likeButton'));

likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle('element__likeButton_active');
    });
  });