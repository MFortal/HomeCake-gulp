export async function getResponse() {
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
