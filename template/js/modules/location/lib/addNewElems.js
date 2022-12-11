import { getInnerHTMLElems } from "./getInnerHTMLElems.js";
import {
  data,
  selectedCities,
  selectedContainer,
  getHTMLSelectedItem,
  locationButton,
} from "../common.js";

export const addNewElems = (flag, start, finish) => {
  // Добавление еще 10 городов
  let currentData;
  if (flag == data.default.flag) {
    currentData = data.default;
  } else currentData = data.search;

  if (!start) start = 0;
  if (!finish) {
    finish = currentData.count;
  }

  // Если в этот раз будет отображен последний элемент
  // Тогда закончить observer
  const lastElemFlag = finish == currentData.items.length ? true : false;

  for (let i = start; i < finish; i++) {
    getInnerHTMLElems(currentData.items[i], currentData.flag);
  }

  const elems = document.querySelectorAll(".location-elem");
  elems.forEach((elem) => {
    elem.addEventListener("click", () => {
      const currentId = elem.dataset.id;
      const currentElem = data.default.items.find(
        (item) => item.id == currentId
      );

      if (!selectedCities.has(currentId)) {
        selectedCities.set(currentId, currentElem);

        selectedContainer.classList.add("show");
        locationButton.classList.add("show");

        selectedContainer.innerHTML += getHTMLSelectedItem(
          currentId,
          currentElem.name
        );
      }
    });
  });

  // Добавление обзервера для последнего элемента
  if (!lastElemFlag) {
    const lastElem = elems[elems.length - 1];
    if (lastElem) {
      infinteObserver.observe(lastElem);
    }
  }
};

// Подгрузка городов при скролле
const infinteObserver = new IntersectionObserver(
  ([city], observer) => {
    let flag = city.target.dataset.flag;
    let count, step, length;

    // Проверка на достижение последнего элемента
    if (city.isIntersecting) {
      // Остановка отслеживания
      observer.unobserve(city.target);
      // Отображение новых данных
      if (flag == data.default.flag) {
        count = data.default.count;
        step = data.default.step;
        length = data.default.items.length;
      } else {
        count = data.search.count;
        step = data.search.step;
        length = data.search.items.length;
      }

      if (count + step < length) {
        flag == data.default.flag
          ? (data.default.count += step)
          : (data.search.count += step);
        addNewElems(flag, count - step);
      } else {
        addNewElems(flag, count, length);
      }
    }
  },
  { threshold: 0.2 }
);
