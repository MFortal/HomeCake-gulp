import { addAnimate } from "./addAnimate.js";

// Установка отступа для главной страницы
const main = document.querySelector("#main");
const header = document.querySelector("#header");

const setPaddingMain = () => {
  main.style.paddingTop = header.offsetHeight - 1 + "px";
};

// Бургер
const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__nav");
const body = document.querySelector("body");
const items = document.querySelectorAll(".menu__item");

const toggleClasses = () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  body.classList.toggle("lock");
};

const setMenuListener = () => {
  if (document.documentElement.clientWidth <= 768) {
    burger.addEventListener("click", toggleClasses);
    for (let item of items) {
      item.addEventListener("click", toggleClasses);
    }
  } else {
    burger.removeEventListener("click", toggleClasses);
    for (let item of items) {
      item.removeEventListener("click", toggleClasses);
    }
  }
};

export const setOnloadEvent = () => {
  window.onload = function () {
    setPaddingMain();
    // Убирание прелодера при полной загрузке
    document
      .querySelector(".preloader-container")
      .classList.add("preloader_close");

    // Запуск анимации
    addAnimate();

    // Работа с меню
    setMenuListener();
  };

  window.onresize = function () {
    setPaddingMain();

    setMenuListener();
  };
};
