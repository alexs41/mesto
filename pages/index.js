const button = document.querySelector('.profile-text-info__editButton');
const form = document.querySelector('.form');
const formCloseButton = document.querySelector('.form-edit-profile__close-button');

// console.log(button);
// function closeFormOnQ(e) {
//     if (e.code === 'KeyQ') {
//         closeForm();
//     }
// }
function openForm() {
    form.classList.remove('form_hidden');
    // document.addEventListener('keypress', closeFormOnQ);
    fullName.value = document.querySelector('.profile-text-info__full-name').textContent;
    description.value = document.querySelector('.profile-text-info__description').textContent;
}
function closeForm() {
    form.classList.add('form_hidden');
    // document.removeEventListener('keypress', closeFormOnQ);
}

button.addEventListener('click', function () {
    openForm();
});

formCloseButton.addEventListener('click', function () {
    closeForm();
});

form.addEventListener('click', function (e) {
        if (e.target === e.currentTarget) {
            closeForm();
        }
    });

// --------------------------------------------
let fullName = document.querySelector('.form-edit-profile__full-name');
let description = document.querySelector('.form-edit-profile__description');
const submitButton = document.querySelector('.form-edit-profile__submit-button');



function saveButtonAction() {
    document.querySelector('.profile-text-info__full-name').textContent = fullName.value;
    document.querySelector('.profile-text-info__description').textContent = description.value;
    closeForm();
}

submitButton.addEventListener('click', saveButtonAction);
// --------------------------------------------

const likeButtons = Array.from(document.querySelectorAll('.element__likeButton'));

likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle('element__likeButton_active');
    });
  });