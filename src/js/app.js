import * as functions from "./modules/functions.js";

functions.isWebp();

// Переменная для запросов к серверу
let countResponse = false;

let elems = document.querySelector(".location-elems");
let locationBody = document.querySelector(".location-body");
let preloader = document.querySelector(".preloader");

let locationModal = document.querySelector(".location__modal");
let location = document.querySelector(".location");
let locationClose = document.querySelector(".location-search__close");
let locationInput = document.querySelector(".location-search__input");

let countCities = 10;
const step = 10;
let cities = [];
let lengthCities = 0;

async function getResponse() {
  // Скрытие данных и отображение прелодера
  locationBody.classList.add("hide");
  preloader.classList.remove("hide");

  // Запрос к серверу
  const url = "https://studika.ru/api/areas";
  let response = await fetch(url, { method: "POST" });
  let content = await response.json();

  // Все города с округами
  let id = 0;
  for (let state in content) {
    if ("cities" in content[state]) {
      for (let city in content[state].cities) {
        cities.push({
          id: id++,
          name: content[state].cities[city].name,
          state: content[state].name,
        });
      }
    } else cities.push({ id: id++, state: content[state].name });
  }

  // Отображение данных, скрытие прелодера, фокусировка на инпуте
  locationBody.classList.remove("hide");
  preloader.classList.add("hide");
  locationInput.focus();

  loadNewElems();

  // Запрос к серверу был выполнен
  countResponse = true;
}

// Отображение локального окна для поиска города
location.addEventListener("click", () => {
  locationModal.classList.toggle("hide");
  if (!locationModal.classList.contains("hide")) {
    locationInput.focus();
    // Если запроса к серверу еще не было - запросить
    if (!countResponse) getResponse();
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

// Подгружка городов при скролле

const infinteObserver = new IntersectionObserver(
  ([city], observer) => {
    // Проверка на достижение последнего элемента
    if (city.isIntersecting) {
      // Остановка отслеживания
      observer.unobserve(city.target);
      // Отображение новых данных
      // Нужно подредачить условие, если дойти до конца массива, то будет работать некорректно
      countCities < cities.length
        ? (countCities += step)
        : (countCities = cities.length);
      loadNewElems(countCities - step);
    }
  },
  { threshold: 0.2 }
);

const loadNewElems = (start = 0) => {
  // Добавление еще 10 городов
  for (let key in cities.splice(start, countCities)) {
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

  // Добавление обзервера для последнего элемента
  const lastElem = document.querySelector(".location-elem:last-child");
  console.log(lastElem);
  if (lastElem) {
    infinteObserver.observe(lastElem);
  }
};
