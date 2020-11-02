'use strict';

(function () {
  const QUANTITY = 5;
  const DEBOUNCE_INTERVAL = 500;
  const BASE = 10;
  const PRICE_LOWER_LIMIT = 10000;
  const PRICE_UPPER_LIMIT = 50000;
  const PRICE_RANGE_MIDDLE = `middle`;
  const PRICE_RANGE_LOW = `low`;
  const PRICE_RANGE_HIGH = `high`;
  const ANY_FILTER_VALUE = `any`;

  const form = document.querySelector(`.map__filters`);

  const limitQuantity = (data = window.data.adsData) => {
    return data.slice(0, QUANTITY);
  };

  const getFilterElement = () => {
    return form;
  };

  const changeFilter = () => {
    let lastTimeout;

    const setFilter = () => {
      const housingType = form.querySelector(`#housing-type`);
      const housingPrice = form.querySelector(`#housing-price`);
      const housingRoom = form.querySelector(`#housing-rooms`);
      const housingGuests = form.querySelector(`#housing-guests`);
      const filterWifi = form.querySelector(`#filter-wifi`);
      const filterDishwasher = form.querySelector(`#filter-dishwasher`);
      const filterParking = form.querySelector(`#filter-parking`);
      const filterWasher = form.querySelector(`#filter-washer`);
      const filterElevator = form.querySelector(`#filter-elevator`);
      const filterConditioner = form.querySelector(`#filter-conditioner`);

      const checkPrice = (price) => {
        if (housingPrice.value === PRICE_RANGE_MIDDLE && (price < PRICE_LOWER_LIMIT || price > PRICE_UPPER_LIMIT)) {
          return false;
        }

        if (housingPrice.value === PRICE_RANGE_LOW && (price >= PRICE_LOWER_LIMIT)) {
          return false;
        }

        return !(housingPrice.value === PRICE_RANGE_HIGH && (price <= PRICE_UPPER_LIMIT));
      };

      const filteredPins = window.data.adsData.filter((item) => {
        return (housingType.value === ANY_FILTER_VALUE || housingType.value === item.offer.type)
          && (housingPrice.value === ANY_FILTER_VALUE || checkPrice(item.offer.price))
          && (housingRoom.value === ANY_FILTER_VALUE || parseInt(housingRoom.value, BASE) === item.offer.rooms)
          && (housingGuests.value === ANY_FILTER_VALUE || parseInt(housingGuests.value, BASE) === item.offer.guests)
          && (filterWifi.checked && item.offer.features.includes(filterWifi.value) || !filterWifi.checked)
          && (filterDishwasher.checked && item.offer.features.includes(filterDishwasher.value) || !filterDishwasher.checked)
          && (filterParking.checked && item.offer.features.includes(filterParking.value) || !filterParking.checked)
          && (filterWasher.checked && item.offer.features.includes(filterWasher.value) || !filterWasher.checked)
          && (filterElevator.checked && item.offer.features.includes(filterElevator.value) || !filterElevator.checked)
          && (filterConditioner.checked && item.offer.features.includes(filterConditioner.value) || !filterConditioner.checked);
      });

      window.card.closeCard();
      window.render.renderMapPins(limitQuantity(filteredPins));
    };

    form.addEventListener(`change`, () => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        setFilter();
      }, DEBOUNCE_INTERVAL);
    });
  };

  window.filter = {
    getFilterElement,
    limitQuantity,
    changeFilter
  };
})();
