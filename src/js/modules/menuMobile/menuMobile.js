const body = document.querySelector("body");
const nav = document.querySelector(".header-mobile-nav");
const burger = document.querySelector(".burger");

const toggleClasses = () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  body.classList.toggle("lock");
};

export const setMenuEvent = () => {
  burger.addEventListener("click", toggleClasses);
};
