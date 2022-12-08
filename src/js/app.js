import * as functions from "./modules/functions.js";

functions.isWebp();

let elems = document.querySelector(".location-elems");
let locationBody = document.querySelector(".location-body");
let preloader = document.querySelector(".preloader");

let locationModal = document.querySelector(".location__modal");
let location = document.querySelector(".location");
let locationClose = document.querySelector(".location-search__close");
let locationInput = document.querySelector(".location-search__input");

async function getResponse() {
  // Скрытие данных и отображение прелодера
  locationBody.classList.add("hide");
  preloader.classList.remove("hide");

  // Запрос к серверу
  const url = "https://studika.ru/api/areas";
  let response = await fetch(url, { method: "POST" });
  let content = await response.json();

  // Все города с округами
  let cities = [];
  for (let state in content) {
    if ("cities" in content[state]) {
      for (let city in content[state].cities) {
        cities.push({
          name: content[state].cities[city].name,
          state: content[state].name,
        });
      }
    } else cities.push({ state: content[state].name });
  }

  // Отображение данных, скрытие прелодера, фокусировка на инпуте
  locationBody.classList.remove("hide");
  preloader.classList.add("hide");
  locationInput.focus();

  for (let key in cities.splice(0, 80)) {
    if ("name" in cities[key]) {
      elems.innerHTML += `
          <div class="location-elem">
            <span class="location-elem__city">${cities[key].name}</span>
            <span class="location-elem__city-state">${cities[key].state}</span>
          </div>`;
    } else {
      elems.innerHTML += `
          <div class="location-elem">
            <span class="location-elem__city">${cities[key].state}</span>
          </div>`;
    }
  }
}

// Отображение локального окна для поиска города
location.addEventListener("click", () => {
  locationModal.classList.toggle("hide");
  if (!locationModal.classList.contains("hide")) {
    locationInput.focus();
    getResponse();
  }
});

// Очистка инпута городов
locationClose.addEventListener("click", () => {
  locationInput.value = "";
  locationClose.classList.add("hide");
  locationInput.focus();
});

// Добавление крестика при наборе на инпуте
locationInput.addEventListener("keydown", () => {
  locationClose.classList.remove("hide");
  if (locationInput.value == "") locationClose.classList.add("hide");
});
