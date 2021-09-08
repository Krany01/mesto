const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const popupEditbutton = profile.querySelector('.profile__edit-button');
const popupList = document.querySelectorAll('.popup');
const popupElementEdit = document.querySelector('.popup_type_profile');
const popupEditClose = popupElementEdit.querySelector('.popup__button_close-edit');
const popupProfileForm = popupElementEdit.querySelector('.popup__form');
const profileName = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const inputInfoName = popupProfileForm.querySelector('.popup__info_type_name');
const inputInfoAboutyourself = popupProfileForm.querySelector('.popup__info_type_about-your-self');

const popupAdd = document.querySelector('.popup-add');
const formAdd = document.querySelector('.popup__form_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__button_close_add');
const cardsInfo = document.querySelector('.cards__info');
const templateCards = document.querySelector('.template-cards');
const infoTitle = formAdd.querySelector('.popup__info_type_title');
const infoTypeUrl = formAdd.querySelector('.popup__info_type_url');
const initialCards = [{
        name: 'Италия',
        link: 'https://images.unsplash.com/photo-1625741333766-ed5116195b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
    },
    {
        name: 'Афины, Греция',
        link: 'https://images.unsplash.com/photo-1625599455800-9d34374471d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
    },
    {
        name: 'Будва, Черногория',
        link: 'https://images.unsplash.com/photo-1625754648538-9eaa75cf4a98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=582&q=80'
    },
    {
        name: 'Орегон, США',
        link: 'https://images.unsplash.com/photo-1625628748830-639e59adbcfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80'
    },
    {
        name: 'Озеро Брайес, Прага, Южный Тироль, Италия',
        link: 'https://images.unsplash.com/photo-1625485352384-9cce3988b545?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80'
    },
    {
        name: 'Бали, Индонезия',
        link: 'https://images.unsplash.com/photo-1625718008796-f580990ec51d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
    }
];
/*переменные фулскрин попап*/
const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenText = document.querySelector('.popup__fullscreen-text');
const fullscreenButtonClose = document.querySelector('.popup__button_close-fullscreen');

/*слушатель*/

function addEventListeners(element) {
    element.querySelector('.cards__button_delete').addEventListener('click', deleteCard);
    element.querySelector('.cards__button_like').addEventListener('click', likeCard);
    element.querySelector('.cards__image').addEventListener('click', openFullscreen);
}

function createCard(formAdd) {
    const element = templateCards.content.cloneNode(true);
    const elementTitle = element.querySelector('.cards__title');
    const elementImage = element.querySelector('.cards__image');
    elementTitle.textContent = formAdd.name;
    elementImage.src = formAdd.link;
    elementImage.alt = formAdd.name;
    addEventListeners(element);
    return element;
}

function placementCard(element) {
    cardsInfo.prepend(element);
}
initialCards.forEach(formAdd => {
    const element = createCard(formAdd);
    placementCard(element);
})

function deleteCard(evt) {
    const element = evt.target.closest('.cards__card');
    element.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('cards__button_like-active');
}

function editInfoTitleUrl(event) {
    event.preventDefault();
    const element = createCard({
        name: infoTitle.value,
        link: infoTypeUrl.value,
    });
    closepopupAdd(popupAdd);
    placementCard(element);
}

function handlerEscKey(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        closePopup(popupOpened);
    }
}

popupList.forEach(popup => {
    popup.addEventListener('keydown', handlerEscKey)
})

/*Закрытие popup при клике на пустое место*/
function handlerEvent(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}
/*Ф-я открытия popup*/
function openPopup(element) {
    element.classList.add('popup_opened');
    element.addEventListener('click', handlerEvent);
    document.addEventListener('keydown', handlerEscKey);
}

/*Ф-я закрытия popup*/
function closePopup(element) {
    element.classList.remove('popup_opened');
    element.removeEventListener('click', handlerEvent);
    document.removeEventListener('keydown', handlerEscKey);
    setDefaultErrorState(element, validationSettings);
}

/*Ф-и упрощения*/
function initializeProfileInfo() {
    inputInfoName.value = profileName.textContent;
    inputInfoAboutyourself.value = profileSubtitle.textContent;
}

function emptyInputValue(element) {
    const inputs = Array.from(element.querySelectorAll('.popup__info'));
    inputs.forEach(elem => {
        elem.value = '';
    })
}

/*Ф-и открытия и закрытия с проверкой валидности*/
function openProfilePopup() {
    initializeProfileInfo()
    openPopup(popupElementEdit);
}

function openpopupAdd() {
    emptyInputValue(formAdd);
    openPopup(popupAdd);
}

function openFullscreen(evt) {
    const element = evt.target.closest('.cards__image');
    fullscreenImage.src = element.src;
    fullscreenText.textContent = element.alt;
    openPopup(popupFullscreen);
}

function closeProfilePopup() {
    closePopup(popupElementEdit);
}

function closepopupAdd() {
    closePopup(popupAdd);
}

function closeFullscreen() {
    closePopup(popupFullscreen);
}

/*Ф-я редактирования данных профиля*/
function editNameAbout(evt) {
    evt.preventDefault();
    profileName.textContent = inputInfoName.value;
    profileSubtitle.textContent = inputInfoAboutyourself.value;
    closeProfilePopup();
}

popupEditbutton.addEventListener('click', openProfilePopup);
popupEditClose.addEventListener('click', closeProfilePopup);
popupProfileForm.addEventListener('submit', editNameAbout);

popupAddButton.addEventListener('click', openpopupAdd);
popupCloseButton.addEventListener('click', closepopupAdd);
fullscreenButtonClose.addEventListener('click', closeFullscreen);
formAdd.addEventListener('submit', editInfoTitleUrl);