// Переменная для запросов к серверу
export let response = { value: false };

export const elems = document.querySelector(".location-elems");
export const locationModal = document.querySelector(".location__modal");
export const location = document.querySelector(".location");
export const locationClose = document.querySelector(".location-search__close");
export const locationInput = document.querySelector(".location-search__input");

export let data = {
  default: {
    count: 10,
    step: 10,
    items: [],
    flag: "default",
  },
  search: {
    count: 10,
    step: 10,
    items: [],
    flag: "search",
  },
};

export let selectedElemIds = [];

export const pushElem = (array, elem) => {
  array.push(elem);
};
