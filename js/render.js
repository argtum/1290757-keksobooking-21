'use strict';

(function () {
  const renderMapPins = (data) => {
    const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const mapPinsContainer = document.querySelector(`.map__pins`);
    const fragment = document.createDocumentFragment();

    data.forEach((pinData, index) => {
      const mapPin = window.pin.createMapPin(pinData, mapPinTemplate, index);

      fragment.appendChild(mapPin);
    });

    mapPinsContainer.appendChild(fragment);
  };

  const renderCard = (data) => {
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const cardContainer = document.querySelector(`.map`);
    const cardPositionMarker = document.querySelector(`.map__filters-container`);
    const fragment = document.createDocumentFragment();
    const card = window.card.createCard(data, cardTemplate);

    fragment.appendChild(card);
    cardContainer.insertBefore(fragment, cardPositionMarker);
  };

  const renderData = () => {
    window.data.getData((data) => {
      window.data.adsData = data;
      renderMapPins(window.data.adsData);
      renderCard(window.data.adsData[0]);
      window.card.onMapClick();
    });
  };

  window.render = {
    renderData,
    renderCard
  };
})();
