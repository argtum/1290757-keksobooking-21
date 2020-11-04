'use strict';

(function () {
  const DEFAULT_PRICE_LIMIT = 1000;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const PICTURE_WIDTH = 70;
  const PICTURE_HEIGHT = 70;

  const form = document.querySelector(`.ad-form`);
  const resetButton = form.querySelector(`.ad-form__reset`);
  const errorButton = document.querySelector(`.error__button`);

  const switchForm = () => {
    form.classList.toggle(`ad-form--disabled`);
  };

  const toggleForms = () => {
    window.form.toggleForm(form);
    window.form.toggleForm(window.filter.getFilterElement());
  };

  const toggleForm = (switchableForm) => {
    const formDisabled = switchableForm.cloneNode(true);

    for (let item of formDisabled.children) {
      item.disabled = !item.disabled;
    }

    switchableForm.innerHTML = null;
    switchableForm.insertAdjacentHTML(`beforeend`, formDisabled.innerHTML);
  };

  const setAddress = () => {
    document.querySelector(`#address`).value = window.pin.getMapPinCoordinate();
  };

  const setPriceRange = (value = DEFAULT_PRICE_LIMIT) => {
    const priceField = document.querySelector(`#price`);

    priceField.placeholder = value;
    priceField.min = value;
  };

  const removeErrorMessage = () => {
    const errorMessage = document.querySelector(`.error`);

    window.render.removeMessage(errorMessage);

    document.removeEventListener(`mousedown`, onErrorCardClose);
    errorButton.addEventListener(`mousedown`, onErrorCardClose);
    document.removeEventListener(`keydown`, onErrorCardClose);
  };

  const onErrorCardClose = (evt) => {
    if (evt.type === `keydown`) {
      if (evt.target.classList.contains(`error__button`)) {
        window.util.isEnterEvent(evt, removeErrorMessage);
      } else {
        window.util.isEscapeEvent(evt, removeErrorMessage);
      }
    } else if (evt.type === `mousedown`) {
      window.util.isLeftMouseButtonEvent(evt, removeErrorMessage);
    }
  };

  const sentWithError = () => {
    window.render.renderErrorMessage();

    document.addEventListener(`mousedown`, onErrorCardClose);
    errorButton.addEventListener(`mousedown`, onErrorCardClose);
    document.addEventListener(`keydown`, onErrorCardClose);
  };

  const removeSuccessMessage = () => {
    const successMessage = document.querySelector(`.success`);

    window.render.removeMessage(successMessage);

    document.removeEventListener(`mousedown`, onSuccessCardClose);
    document.removeEventListener(`keydown`, onSuccessCardClose);
  };

  const onSuccessCardClose = (evt) => {
    if (evt.type === `keydown`) {
      window.util.isEscapeEvent(evt, removeSuccessMessage);
    } else if (evt.type === `mousedown`) {
      window.util.isLeftMouseButtonEvent(evt, removeSuccessMessage);
    }
  };

  const sentSuccessfully = () => {
    window.state.deactivate();
    window.render.renderSuccessMessage();

    document.addEventListener(`mousedown`, onSuccessCardClose);
    document.addEventListener(`keydown`, onSuccessCardClose);
  };

  const onSendData = (evt) => {
    evt.preventDefault();
    window.network.uploadFormData(new FormData(form), sentSuccessfully, sentWithError);
  };

  const submissionHandler = () => {
    form.addEventListener(`submit`, onSendData);
  };

  const stopSubmissionHandler = () => {
    form.addEventListener(`submit`, onSendData);
  };

  const reset = () => {
    window.state.deactivate();

    resetButton.removeEventListener(`mousedown`, onReset);
    resetButton.removeEventListener(`keydown`, onReset);
  };

  const onReset = (evt) => {
    evt.preventDefault();

    if (evt.type === `keydown`) {
      window.util.isEnterEvent(evt, reset);
    } else if (evt.type === `mousedown`) {
      window.util.isLeftMouseButtonEvent(evt, reset);
    }
  };

  const clear = () => {
    resetButton.addEventListener(`mousedown`, onReset);
    resetButton.addEventListener(`keydown`, onReset);
  };

  const loadPicture = (input, preview) => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (preview.tagName === `IMG`) {
          preview.src = reader.result;
        } else {
          const image = document.createElement(`img`);

          image.src = reader.result;
          image.alt = fileName;
          image.width = PICTURE_WIDTH;
          image.height = PICTURE_HEIGHT;

          preview.appendChild(image);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  const onLoadAvatar = (input, preview) => {
    loadPicture(input, preview);
  };

  const onLoadPhoto = (input, preview) => {
    loadPicture(input, preview);
  };

  const setAvatar = () => {
    const avatarInput = form.querySelector(`.ad-form-header__input`);
    const avatarPreview = form.querySelector(`.ad-form-header__preview img`);

    avatarInput.addEventListener(`change`, () => {
      onLoadAvatar(avatarInput, avatarPreview);
    });
  };

  const setPhoto = () => {
    const photoInput = form.querySelector(`.ad-form__input`);
    const photoPreview = form.querySelector(`.ad-form__photo`);

    photoInput.addEventListener(`change`, () => {
      onLoadPhoto(photoInput, photoPreview);
    });
  };

  window.form = {
    switchForm,
    toggleForm,
    setAddress,
    toggleForms,
    submissionHandler,
    stopSubmissionHandler,
    clear,
    setPriceRange,
    setAvatar,
    setPhoto
  };
})();
