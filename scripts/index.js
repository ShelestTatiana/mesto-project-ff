// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');



// @todo: Функция создания карточки
function addCard(item, deleteCard) {
    let cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    cardItem.querySelector('.card__image').src = item.link;
    cardItem.querySelector('.card__image').alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click', function (evt) {
        deleteCard(evt)
    });
    return cardItem;
};


// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};


// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(addCard(item, deleteCard));
  });







