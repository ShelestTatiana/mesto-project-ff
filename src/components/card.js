import { cardTemplate } from "./index";

//функция создания карточки 
export function createCard(item, deleteCard, openImg, addLikeActive) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true); 
    const deleteButton = cardItem.querySelector('.card__delete-button'); 
    const newCard = cardItem.querySelector('.card__image');
    const likeButton = cardItem.querySelector('.card__like-button');
    newCard.src = item.link; 
    newCard.alt = item.name; 
    cardItem.querySelector('.card__title').textContent = item.name; 
        
    //обработчик для открытия
    newCard.addEventListener('click', () => openImg(item));

    //обработчик для удаления
    deleteButton.addEventListener('click', deleteCard); 

    //обработчик для лайка
    likeButton.addEventListener('click', addLikeActive);
 
    return cardItem;
}; 

// @todo: Функция удаления карточки 
export function deleteCard(evt) { 
    evt.target.closest('.card').remove(); 
}; 

//поставить лайк
export const addLikeActive = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}