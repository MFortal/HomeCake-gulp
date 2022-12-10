import {
  location,
  locationModal,
  locationInput,
  locationBody,
  preloader,
  response,
  locationClose,
  elems,
  selectedContainer,
  selectedCities,
  getHTMLSelectedItem,
  locationButton,
} from "./common.js";
import { liveSearch } from "./lib/liveSearch.js";
import { setDefaultInnerHTML } from "./lib/setDefaultInnerHTML.js";
import { getCities } from "./lib/getCities.js";
import { setCookie, getCookie, getData } from "../functions.js";

const locationCity = document.querySelector(".location__city");

export function functionLocation() {
  listeners();
}

const listeners = () => {
  // Отображение локального окна для поиска города
  location.addEventListener("click", () => {
    locationModal.classList.toggle("hide");
    if (!locationModal.classList.contains("hide")) {
      locationInput.focus();
      // Если запроса к серверу еще не было - запросить
      if (!response.value) getCities();
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

  // Удаление городов из выбранных
  selectedContainer.addEventListener("click", function (e) {
    const currentId = e.target.dataset.id;
    // Если это город
    if (currentId) {
      selectedCities.delete(currentId);

      selectedContainer.innerHTML = "";

      if (selectedCities.size == 0) {
        selectedContainer.classList.remove("show");
        locationButton.classList.remove("show");
      } else {
        for (let city of selectedCities.values()) {
          selectedContainer.innerHTML += getHTMLSelectedItem(
            city.id,
            city.name
          );
        }
      }
    }
  });

  // Отправка выбранных городов в куки
  locationButton.addEventListener("click", () => {
    let cities = [];
    let currentCities = [];

    for (let city of selectedCities.values()) {
      cities.push({ id: city.id, name: city.name });
      currentCities.push(city.name);
    }
    currentCities = currentCities.join(", ");
    locationCity.innerHTML = currentCities;

    setCookie("cities", JSON.stringify(cities));
    console.log(`cookie: ${getCookie("cities")}`);

    // Показ прелодера и скрытие всех городов
    locationBody.classList.add("hide");
    preloader.classList.remove("hide");

    // Отправка данных на сервер
    getData(cities)
      .then(() => {
        locationModal.classList.add("hide");
        locationBody.classList.remove("hide");
        preloader.classList.add("hide");
      })
      .catch((reject) => console.log(reject));
  });
};
