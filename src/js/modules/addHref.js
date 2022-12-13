// Функция якоря на кнопку
export const addHref = (bClass, bHref) => {
  let button = document.querySelector(bClass);
  button.addEventListener("click", () => {
    location.href = bHref;
  });
};
