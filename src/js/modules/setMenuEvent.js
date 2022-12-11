const burger = document.querySelector(".burger");

const location = document.querySelector(".location-container");
const search = document.querySelector(".search");
const nav = document.querySelector(".header__nav");
const profile = document.querySelector(".profile");

const toggleClasses = () => {
  burger.classList.toggle("active");

  location.classList.toggle("active-menu");
  search.classList.toggle("active-menu");
  nav.classList.toggle("active-menu");
  profile.classList.toggle("active-menu");
};

export const setMenuEvent = () => {
  burger.addEventListener("click", toggleClasses);
};
