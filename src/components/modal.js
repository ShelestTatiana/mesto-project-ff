//открытие попап
export const openModal = (popupElement) => {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
};

//закрытие попап
export const closeModal = (popupElement) => {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeOverlay);
    document.removeEventListener('keydown', closeByEsc);
};

//закрытие by esc
const closeByEsc = (evt) => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openedPopup);
    };
};

//закрытие by overlay
export const closeOverlay = (popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeModal(popup);
        }
    });
};




