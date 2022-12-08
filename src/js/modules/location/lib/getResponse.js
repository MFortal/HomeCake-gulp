import { addNewElems } from "./addNewElems.js";
import { locationInput, response, data } from "../variables.js";

const locationBody = document.querySelector(".location-body");
const preloader = document.querySelector(".preloader");

export async function getResponse() {
  // Скрытие данных и отображение прелодера
  locationBody.classList.add("hide");
  preloader.classList.remove("hide");

  // Запрос к серверу
  const url = "https://studika.ru/api/areas";
  let result = await fetch(url, { method: "POST" });
  let content = await result.json();

  // Все города с округами
  let id = 0;
  for (let state in content) {
    if ("cities" in content[state]) {
      for (let city in content[state].cities) {
        data.default.items.push({
          id: id++,
          name: content[state].cities[city].name,
          state: content[state].name,
        });
      }
    } else data.default.items.push({ id: id++, name: content[state].name });
  }

  // Отображение данных, скрытие прелодера, фокусировка на инпуте
  locationBody.classList.remove("hide");
  preloader.classList.add("hide");
  locationInput.focus();

  addNewElems(data.default.flag);

  // Запрос к серверу был выполнен
  response.value = true;
}
