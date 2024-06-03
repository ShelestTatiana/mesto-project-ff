// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');



// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardItem.querySelector('.card__delete-button');
    cardItem.querySelector('.card__image').src = item.link;
    cardItem.querySelector('.card__image').alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click', deleteCard);

    return cardItem;
};


// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};


// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(createCard(item, deleteCard));
  });
