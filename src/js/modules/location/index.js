import {
  location,
  locationModal,
  locationInput,
  response,
  locationClose,
  elems,
  selectedContainer,
  selectedCities,
  getHTMLSelectedItem,
} from "./common.js";
import { liveSearch } from "./lib/liveSearch.js";
import { setDefaultInnerHTML } from "./lib/setDefaultInnerHTML.js";
import { getResponse } from "./lib/getResponse.js";

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
      if (!response.value) getResponse();
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
      } else {
        for (let city of selectedCities.values()) {
          selectedContainer.innerHTML += getHTMLSelectedItem(city.id, city.name);
        }
      }
    }
  });
};
