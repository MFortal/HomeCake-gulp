import {
  location,
  locationModal,
  locationInput,
  response,
  locationClose,
  elems,
} from "./variables.js";
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
};
