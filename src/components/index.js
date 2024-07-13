import '../pages/index.css'; 
import { initialCards } from './cards';
import { openModal, closeModal, closeOverlay } from './modal';
import { createCard, addLikeActive, deleteCard } from './card';

// @todo: Темплейт карточки 
export const cardTemplate = document.querySelector('#card-template').content; 
 
// @todo: DOM узлы 
const placesList = document.querySelector('.places__list'); 

//   переменные для открытия и закрытия popup
const popupEdit = document.querySelector('.popup_type_edit');
const openButtonPopupEdit = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const openButtonPopupAdd = document.querySelector('.profile__add-button');
const popupImg = document.querySelector('.popup_type_image');
const imgCard = document.querySelector('.popup__image');
const imgCaption = document.querySelector('.popup__caption');
const closeButtonPopup = document.querySelectorAll('.popup__close');
const submitButton = document.querySelectorAll('.popup__button');

//переменные для формы редатирования имени и информации
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//переменные для добавления картинки
const formForImage = popupAdd.querySelector('.popup__form');
const placeInput = formForImage.querySelector('.popup__input_type_card-name');
const linkInput = formForImage.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу 
initialCards.forEach(function(item) { 
    placesList.append(createCard(item, deleteCard, openImg, addLikeActive)); 
  }); 
  
//редактирование учетки 
openButtonPopupEdit.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    //открыть модальное окно
    openModal(popupEdit);
});

//обработчик добавления карточки
openButtonPopupAdd.addEventListener('click', () => openModal(popupAdd));

//открыть попап картинку
function openImg(item) {
    imgCard.src = item.link;
    imgCard.alt = item.name;
    imgCaption.textContent = item.name;
    openModal(popupImg);
};

//закрыть форму by x
closeButtonPopup.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closeModal(popup);
    });
});

//закрыть по клику на оверлей
closeOverlay(popupEdit);
closeOverlay(popupAdd);
closeOverlay(popupImg);

//редактирование имени и информации о себе
function editAccount(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit);
}

formElement.addEventListener('submit', editAccount);

// добавить новую картинку
function addNewCard(evt) {
    evt.preventDefault();
    const addCard = createCard(
        {
        name: placeInput.value,
        link: linkInput.value
    },
    deleteCard,//удалить карточку
    openImg,//увеличить картинку
    addLikeActive//поставить лайк
    );
    placesList.prepend(addCard);//вставить картинку в начало
    formForImage.reset();//очистить форму
    closeModal(popupAdd);//закрыть форму
};

formForImage.addEventListener('submit', addNewCard);


