let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let popupEditbutton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__button_close');
let popupForm = popup.querySelector('.popup__form');
let profileName = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let inputInfoName = popupForm.querySelector('.popup__info_name');
let inputInfoAboutyourself = popupForm.querySelector('.popup__info_aboutyourself');

/*Popup-открытие*/
function PopupOpened() {
    popup.classList.add('popup_opened');
    inputInfoName.value = profileName.textContent;
    inputInfoAboutyourself.value = profileSubtitle.textContent;
}

/*Popup-закрытие*/
function PopupClosed() {
    popup.classList.remove('popup_opened');
}

/*Popup-редактор*/
function PopupEditor(evt) {
    evt.preventDefault();
    profileName.textContent = inputInfoName.value;
    profileSubtitle.textContent = inputInfoAboutyourself.value;
    PopupClosed();
}

popupEditbutton.addEventListener('click', PopupOpened);
popupClose.addEventListener('click', PopupClosed);
popupForm.addEventListener('submit', PopupEditor);