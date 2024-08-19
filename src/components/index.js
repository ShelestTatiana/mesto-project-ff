import '../pages/index.css'; 
import { openModal, closeModal, closeOverlay } from './modal';
import { createCard, putDeleteLikes } from './card';
import { enableValidation, clearValidation, showInputError, toggleButtonState } from './validation';
import { getUserRequest, getCardsRequest, patchProfileRequest, postAddCardRequest, headCheckUrl, deleteCardRequest, patchAvatarRequest } from './api';
import { renderLoading } from './utils';

// @todo: DOM узлы 
const placesList = document.querySelector('.places__list'); 

// переменные для попапа
const popupImg = document.querySelector('.popup_type_image');
const imgCard = popupImg.querySelector('.popup__image');
const imgCaption = popupImg.querySelector('.popup__caption');
const closeButtonPopup = document.querySelectorAll('.popup__close');
const submitButton = document.querySelectorAll('.popup__button');//уточнить в случае необходимости

//переменные для формы редатирования имени и информации
const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = popupEdit.querySelector('.popup__form');
const buttonFormSubmit = formEditProfile.querySelector('.popup__button');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const openButtonPopupAdd = document.querySelector('.profile__add-button');
const openButtonPopupEdit = document.querySelector('.profile__edit-button');

//переменные для изменения аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formAvatar = popupEditAvatar.querySelector('.popup__form');
const buttonSubmitAvatar = formAvatar.querySelector('.popup__button');
const inputAvatarForm = formAvatar.querySelector('.popup__input_type_url');
const avatarContainer = document.querySelector('.avatar-container');

//переменные для добавления картинки
const popupAdd = document.querySelector('.popup_type_new-card');
const formForImage = popupAdd.querySelector('.popup__form');
const placeInput = formForImage.querySelector('.popup__input_type_card-name');
const linkInput = formForImage.querySelector('.popup__input_type_url');
const buttonSubmitPopupAdd = popupAdd.querySelector('.popup__button');

//переменные для удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const formForDeleteCard = popupDeleteCard.querySelector('.popup__form');

//объект для валидации
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

//мой пользователь
export let userId;

//вызов валидации формы
enableValidation(validationConfig);

//редактирование имени и информации о себе
function editAccount(evt) {
    evt.preventDefault(); 
    renderLoading(true, buttonFormSubmit);
    patchProfileRequest(nameInput.value, jobInput.value)
    .then(() => {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popupEdit);
    })
    .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
    })
    .finally(() => {
        renderLoading(false, buttonFormSubmit);
    })
};

//обработчик редактирования учетки 
openButtonPopupEdit.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);//открыть модальное окно
    clearValidation(formEditProfile, validationConfig);//очистить ошибки валидации при успешной загрузке
});

//слушатель формы редактирования учетки
formEditProfile.addEventListener('submit', editAccount);

// редактирование аватара
    function editAvatar(evt) {
        evt.preventDefault();
        console.log("Функция editAvatar вызвана");
        headCheckUrl(inputAvatarForm.value)
        .then(() => {
            console.log("URL проверен");
            renderLoading(true, buttonSubmitAvatar);
            const avatarValue = inputAvatarForm.value;
            patchAvatarRequest(avatarValue)
            .then((avatarData) => {
                console.log("Блок .then вызван", avatarData);
                profileImage.style.backgroundImage = `url(${avatarData.avatar})`;
                closeModal(popupEditAvatar);
          })
        .catch((error) => {
            console.log(`Ошибка при загрузке данных: ${error}`);
          })
          .finally(() => {
            renderLoading(false, buttonSubmitAvatar);
          })
        .catch((error) => {
            showInputError(formAvatar, inputAvatarForm, error, validationConfig);
            toggleButtonState(inputAvatarForm, buttonSubmitAvatar, validationConfig);
        });
    }
    )};

//открыть попап редактирования аватара
avatarContainer.addEventListener('click', () => {
    formAvatar.reset();
    openModal(popupEditAvatar);
    clearValidation(formAvatar, validationConfig) // Очистить ошибки валидации 
});

//слушатель редактирования аватара
formAvatar.addEventListener('submit', editAvatar);

//добавление новой картинки
export function addNewCard(evt) {
    evt.preventDefault();
    renderLoading(true, buttonSubmitPopupAdd);
    postAddCardRequest(placeInput.value, linkInput.value)
      .then((item) => {
        placesList.prepend(createCard(item, openImg, deleteCard, putDeleteLikes, userId));
        formForImage.reset();
        clearValidation(formForImage, validationConfig); // очистить ошибки валидации при успешном сабмите
        closeModal(popupAdd);//закрыть форму
      })
    .catch((error) => {
        console.log(`Ошибка при загрузке данных: ${error}`);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitPopupAdd);
      })
  };

//обработчик открытия попапа добавления карточки
openButtonPopupAdd.addEventListener('click', () => {
    formForImage.reset();
    openModal(popupAdd);
});

//слушатель добавления карточки
formForImage.addEventListener('submit', addNewCard);

//открыть попап картинку
function openImg(item) {
    imgCard.src = item.link;
    imgCard.alt = item.name;
    imgCaption.textContent = item.name;
    openModal(popupImg);
};

//открыть попап удаления карточки
export let myCardForDelete = {};
const deleteCard = (cardId, cardItem) => {
    myCardForDelete = {
        id: cardId, cardItem
    }
    openModal(popupDeleteCard);
};

//функция удаления карточки
const handleDeleteCardSubmit = (evt) => {
    evt.preventDefault();
    deleteCardRequest(myCardForDelete.id)
    .then(() => {
        myCardForDelete.cardItem.remove();
        closeModal(popupDeleteCard);
        myCardForDelete = {};
    })
    .catch((error) => {
        console.log(`Error deleting card: ${error}`);
    })
}

//слушатель на попап удаления карточки
formForDeleteCard.addEventListener('submit', (evt) => {
    handleDeleteCardSubmit(evt);
});

//загрузка данных пользователя и карточек
Promise.all([getUserRequest(), getCardsRequest()])
// Обработка извлеченных данных
.then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    userId = userData._id;
    // Вывод карточек на страницу 
    cardsData.forEach(function(item) {
        placesList.append(createCard(item, openImg, deleteCard, putDeleteLikes, userId)); 
    }); 
})
// Обработка ошибки
.catch((error) => {
    console.log(`Ошибка при загрузке данных: ${error}`);
});

//закрыть форму by x
closeButtonPopup.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    });
});

//закрыть по клику на оверлей
const popups = [popupEdit, popupAdd, popupImg, popupEditAvatar, popupDeleteCard];
popups.forEach(popup => closeOverlay(popup));