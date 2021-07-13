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

/*cards*/
const tooglePopup = function(popup) {
    popup.classList.toggle('popup_opened');
}

/* функции фулскрин*/
function openFullscreen(evt) {
    const element = evt.target.closest('.cards__image');
    fullscreenImage.src = element.src;
    fullscreenText.textContent = element.alt;
    tooglePopup(popupFullscreen);
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

function openAddCard() {
    tooglePopup(popupAdd);
    infoTitle.value = '';
    infoTypeUrl.value = '';
}

function editInfoTitleUrl(event) {
    event.preventDefault();
    const element = createCard({
        name: infoTitle.value,
        link: infoTypeUrl.value,
    });
    tooglePopup(popupAdd);
    placementCard(element);
}

/*Popup-открытие*/
function openProfile() {
    tooglePopup(popup);
    inputInfoName.value = profileName.textContent;
    inputInfoAboutyourself.value = profileSubtitle.textContent;
}
/*Popup-редактор*/
function popupEditor(evt) {
    evt.preventDefault();
    profileName.textContent = inputInfoName.value;
    profileSubtitle.textContent = inputInfoAboutyourself.value;
    tooglePopup(popup);
}

popupEditbutton.addEventListener('click', openProfile);
popupClose.addEventListener('click', () => tooglePopup(popup));
popupForm.addEventListener('submit', popupEditor);

popupAddButton.addEventListener('click', openAddCard);
popupCloseButton.addEventListener('click', () => tooglePopup(popupAdd));
fullscreenButtonClose.addEventListener('click', () => tooglePopup(popupFullscreen));
formAdd.addEventListener('submit', editInfoTitleUrl);