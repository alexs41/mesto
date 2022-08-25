
export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    authorization: "6ecd8953-f40f-4499-9406-375b67b7dc1f"
  }
}

export const templateSelector = '.element_template';
export const profileEditButton = document.querySelector('.profile-info-container__edit-button');
export const addElementButton = document.querySelector('.profile__add-button');
export const avatar = document.querySelector('.profile-info__avatar');
