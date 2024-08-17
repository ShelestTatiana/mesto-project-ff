
//объект для авторизации
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
        authorization: '2b46e9fc-1e2f-4c30-b303-a3bd469f0607',
        'Content-Type': 'application/json'
    }
};

//обработка ответа
const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

//получение информации о пользователе с сервера
export const getUserRequest = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(handleResponse)
};

//загрузка карточек с сервера
export const getCardsRequest = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(handleResponse)
};

//редактирование профиля
export const patchProfileRequest = (profileTitle, profileDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        name: profileTitle,
        about: profileDescription
        })
    })
    .then(handleResponse);
};

//добавление новой карточки
export const postAddCardRequest = (placeInput, linkInput) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
        // name: placeInput.value,
        // link: linkInput.value
        name: placeInput,
        link: linkInput
        })
    })
    .then(handleResponse);
};

//постановка и снятие лайка
export const putLikeRequest = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
};

export const deleteLikeRequest = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
};

//удаление карточки
export const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
};

//обновление аватара
export const patchAvatarRequest = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link})
    })
    .then(handleResponse)
  }

//проверка url на изображение
export const headCheckUrl = (url) => {
    return fetch(url, {
        method: 'HEAD',
    })
    .then((url) => {
        if (url.ok) {
            if(url.headers.get('Content-type').includes('image')) {
            return Promise.resolve();
        }
        return Promise.reject('url не является изображением');
        }
        return Promise.reject('url не существует');
    });
}