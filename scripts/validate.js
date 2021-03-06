const validationSettings = {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__info',
    submitButtonSelector: '.popup__button_submit',
    inactiveButtonClass: 'popup__button_submit-inactive',
    inputErrorClass: 'popup__info_type_error',
    errorClass: 'popup__info-error_active'
}

function getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
}

function setDefaultErrorState(popup, settingsObject) {
    const formElement = popup.querySelector(settingsObject.formSelector);
    const inputList = popup.querySelectorAll(settingsObject.inputSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    })
}

function hasInvalidInput(formInputs) {
    return formInputs.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
    if (hasInvalidInput(formInputs)) {
        formSubmitButton.disabled = true;
        formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
    } else {
        formSubmitButton.disabled = false;
        formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
    }
}

function setEventListeners(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleSubmitButtonState(formInputs, formSubmitButton);
    formInputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleSubmitButtonState(formInputs, formSubmitButton);
        });
    });
}

function enableValidation(settingsObject) {
    const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
    formsList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset);
        });
    });
}

enableValidation(validationSettings);