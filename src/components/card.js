import { putLikeRequest, deleteLikeRequest } from "./api";

// @todo: Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 

//клонирование шаблона карточки
const getCardTemplate = () => {
    return cardTemplate.querySelector('.card').cloneNode(true);
};

//функция создания карточки 
export function createCard(item, openImg, deleteCard, putDeleteLikes, userId) {
    //клонирование шаблона карточки
    const cardItem = getCardTemplate();

    //получение элементов карточки
    const deleteButton = cardItem.querySelector('.card__delete-button'); 
    const newCard = cardItem.querySelector('.card__image');
    const likeButton = cardItem.querySelector('.card__like-button');
    const likeCount = cardItem.querySelector(".card__like-count");
    const cardTitle = cardItem.querySelector(".card__title");
    //присвоение значений
    cardTitle.textContent = item.name; 
    newCard.src = item.link; 
    newCard.alt = item.name; 
    likeCount.textContent = item.likes.length;

    //проверка наличия моего лайка
    if(item.likes.some((like) => like._id === userId)) {
        likeButton.classList.add("card__like-button_is-active");
    } else {
        likeButton.classList.remove("card__like-button_is-active");
    }

    //настройка удаления своей карточки
    if(item.owner._id === userId) {
        cardItem.dataset.myCardForDelete = item._id;
        deleteButton.addEventListener('click', () => deleteCard(item._id, cardItem));
        } else {
            deleteButton.remove();
        }
        
        //обработчик открытия карточки
        newCard.addEventListener('click', () => openImg(item));
        
        //обработчик постановки и снятия лайков
        likeButton.addEventListener('click', () => putDeleteLikes(item, likeButton, likeCount, userId));
        return cardItem;
    };

// Функция постановки и снятия лайков
export function putDeleteLikes(item, likeButton, likeCount, userId) {
    //Проверка наличия моего лайка
    if (item.likes.some((like) => like._id === userId)) {
        //удаление только моего лайка
        deleteLikeRequest(item)
        //обновление количества лайков
        .then((newItem) => {
            likeCount.textContent = newItem.likes.length;
            likeButton.classList.remove("card__like-button_is-active");
            item.likes = newItem.likes;
        })
        .catch((error) => console.log(error));
    } else {
        //добавление лайка (если не стоит)
        putLikeRequest(item)
        //обновление количества лайков
        .then((newItem) => {
          likeCount.textContent = newItem.likes.length;
          likeButton.classList.add("card__like-button_is-active");
          item.likes = newItem.likes;
        })
        .catch((error) => console.log(error));
    }
}