// Переменная для запросов к серверу
let countResponse = false;

const elems = document.querySelector(".location-elems");
const locationBody = document.querySelector(".location-body");
const preloader = document.querySelector(".preloader");

const locationModal = document.querySelector(".location__modal");
const location = document.querySelector(".location");
const locationClose = document.querySelector(".location-search__close");
const locationInput = document.querySelector(".location-search__input");

let countCities = 10;
const step = 10;
let cities = [];

let countSearchCities = 10;
const searchStep = 10;
let searchCities = [];

export function functionLocation() {
  listeners();
}

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
    } else cities.push({ id: id++, name: content[state].name });
  }

  // Отображение данных, скрытие прелодера, фокусировка на инпуте
  locationBody.classList.remove("hide");
  preloader.classList.add("hide");
  locationInput.focus();

  loadNewElems();

  // Запрос к серверу был выполнен
  countResponse = true;
}

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

const infinteObserverSearch = new IntersectionObserver(
  ([city], observer) => {
    // Проверка на достижение последнего элемента
    if (city.isIntersecting) {
      // Остановка отслеживания
      observer.unobserve(city.target);
      // Отображение новых данных
      // %%%% Нужно подредачить условие, если дойти до конца массива, то будет работать некорректно
      // %%%% Подрефачить !!!!
      countSearchCities < searchCities.length
        ? (countSearchCities += searchStep)
        : (countSearchCities = searchCities.length);
      loadNewSeacrhElems(countSearchCities - searchStep);
    }
  },
  { threshold: 0.2 }
);

const loadNewElems = (start = 0) => {
  // Добавление еще 10 городов
  for (let i = start; i < countCities; i++) {
    getInnerHTMLElems(cities[i]);
  }

  // Добавление обзервера для последнего элемента
  const lastElem = document.querySelector(".location-elem:last-child");
  if (lastElem) {
    infinteObserver.observe(lastElem);
  }
};

const loadNewSeacrhElems = (start = 0) => {
  for (let i = start; i < countSearchCities; i++) {
    getInnerHTMLElems(searchCities[i]);
  }

  // Добавление обзервера для последнего элемента
  const lastElem = document.querySelector(".location-elem:last-child");
  if (lastElem) {
    infinteObserverSearch.observe(lastElem);
  }
};

const listeners = () => {
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

    setDefaultInnerHTML(elems);
  });

  // Отображение крестика и поиск
  locationInput.addEventListener("input", () => {
    // Добавление крестика при наборе на инпуте
    if (locationInput.value == "") {
      locationClose.classList.add("hide");

      setDefaultInnerHTML(elems);
    } else {
      locationClose.classList.remove("hide");

      // Поиск
      liveSearch(locationInput);
    }
  });
};

const getInnerHTMLElems = (elem) => {
  if ("state" in elem) {
    elems.innerHTML += `
          <div class="location-elem">
            <span class="location-elem__city">${elem.name}</span>
            <span class="location-elem__city-state">${elem.state}</span>
          </div>`;
  } else {
    elems.innerHTML += `
          <div class="location-elem">
            <span class="location-elem__city">${elem.name}</span>
          </div>`;
  }
};

const liveSearch = (input) => {
  elems.innerHTML = "";
  searchCities = [];

  let value = input.value.toLowerCase().trim();
  cities.forEach((city) => {
    let subsrtIndex = city.name?.toLowerCase().search(value);
    if (subsrtIndex !== -1) {
      searchCities.push({
        id: city.id,
        name: formatSubStr(city.name, subsrtIndex, value.length),
        state: city.state ? city.state : null,
      });
    }
  });

  loadNewSeacrhElems();
};

const formatSubStr = (string, position, length) => {
  return (
    string.slice(0, position) +
    "<strong>" +
    string.slice(position, position + length) +
    "</strong>" +
    string.slice(position + length)
  );
};

// Зачистка всех элементов и отображение первых 10
const setDefaultInnerHTML = (item) => {
  item.innerHTML = "";
  countCities = 10;
  loadNewElems();
};
