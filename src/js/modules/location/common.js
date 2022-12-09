// Переменная для запросов к серверу
export let response = { value: false };

export const location = document.querySelector(".location");
export const elems = document.querySelector(".location-elems");
export const selectedContainer = document.querySelector(".location-selected");
export const locationButton = document.querySelector(".location-button");
export const locationModal = document.querySelector(".location__modal");
export const locationInput = document.querySelector(".location-search__input");
export const locationClose = document.querySelector(".location-search__close");

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

export const selectedCities = new Map();

export const getHTMLSelectedItem = (id, name) => {
  return `<div class='location-selected__item' data-id=${id}>${name}
  <svg viewBox="0 0 14 14"  xmlns="http://www.w3.org/2000/svg">
  <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
  </svg>
  </div>`;
};
