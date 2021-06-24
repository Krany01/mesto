let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let popupEditbutton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__button_close');
let popupForm = popup.querySelector('.popup__form');
let profileName = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let inputInfoName = popupForm.querySelector('.popup__info_type_name');
let inputInfoAboutyourself = popupForm.querySelector('.popup__info_type_about-your-self');

/*Popup-открытие*/
function popupOpened() {
    inputInfoName.value = profileName.textContent;
    inputInfoAboutyourself.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

/*Popup-закрытие*/
function popupClosed() {
    popup.classList.remove('popup_opened');
}

/*Popup-редактор*/
function popupEditor(evt) {
    evt.preventDefault();
    profileName.textContent = inputInfoName.value;
    profileSubtitle.textContent = inputInfoAboutyourself.value;
    popupClosed();
}

popupEditbutton.addEventListener('click', popupOpened);
popupClose.addEventListener('click', popupClosed);
popupForm.addEventListener('submit', popupEditor);