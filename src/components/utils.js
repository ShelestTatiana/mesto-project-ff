//рендеринг
export function renderLoading(isLoading, buttonElement) {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
};