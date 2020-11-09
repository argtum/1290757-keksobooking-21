'use strict';

(function () {
  const TYPES = [
    {"palace":
        {
          name: `Дворец`,
          price: 10000
        }
    },
    {"flat":
        {
          name: `Квартира`,
          price: 1000
        }
    },
    {"house":
        {
          name: `Дом`,
          price: 5000
        }
    },
    {"bungalow":
        {
          name: `Бунгало`,
          price: 0
        }
    }
  ];

  let ads;

  const getTypeValue = (key, value) => {
    return TYPES.filter((item) => {
      return item.hasOwnProperty(key);
    })[0][key][value];
  };

  window.data = {
    getTypeValue,
    ads
  };
})();
