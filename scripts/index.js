const button = document.querySelector('.profile-info-container__edit-button');
const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');
const addElementPopup = document.querySelector('.add-element-popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const addElementButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const elementTrashButtons = document.querySelectorAll('.element__trash-button');

const newElementName = document.querySelector('.form__input_element-name');
const newElementPictureLink = document.querySelector('.form__input_picture-link');

const elementImages = document.querySelectorAll('.element__image');
const popupElementImage = document.querySelector('.popup_element-image');

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
    newElementName.value = '';
    newElementPictureLink.value = '';
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

elementTrashButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        button.closest('.element').remove();
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

  //---------------------------------------
const submitButtonAddElement = document.querySelector(".form__submit-button_add-element");

submitButtonAddElement.addEventListener('click', submitButtonAddElementAction);

function submitButtonAddElementAction() {
    renderElement();
    newElementName.value = '';
    newElementPictureLink.value = '';

}

  const elements = document.querySelector(".elements");
  const elementTemplate = document.querySelector(".element_template").content;

function renderElement() {
	const newElement = elementTemplate.querySelector('.element').cloneNode(true);
	// newElement.querySelector('.element__header').innerText = 'аголовок картинки';
    // newElement.querySelector('.element__image').src = 'images/dombai.jpg';
    
    newElement.querySelector('.element__header').innerText = newElementName.value;
    newElement.querySelector('.element__image').src = newElementPictureLink.value;

	newElement.querySelector('.element__trash-button').addEventListener('click', () => {
		newElement.closest('.element').remove();
	});

    newElement.querySelector('.element__like-button').addEventListener('click', () => {
		newElement.querySelector('.element__like-button').classList.toggle('element__like-button_active');
	});
    
    newElement.querySelector('.element__image').addEventListener("click", () => {
        openPopupElementImage(newElement.querySelector('.element__image'));
    });
    
	elements.insertAdjacentElement('afterbegin', newElement);
};

// function deleteElement
// function likeElement
//-----------------------------------------------


elementImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openPopupElementImage(image);
    });
  });

  //-------------------------------------
  // function openPopupElementImage


function openPopupElementImage(image) {
    console.log('openPopupElementImage сработал');
    popupElementImage.classList.add('popup_opened');
    const elementHeader = image.closest('.element').querySelector('.element__header').textContent;
    popupElementImage.querySelector('.figure__caption').innerText = elementHeader;
    popupElementImage.querySelector('.figure__image').src = image.src;
};