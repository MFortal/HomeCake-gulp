import Swiper, { Navigation } from "swiper";

export const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation],
    direction: "horizontal",
    slidesPerView: "auto",
    spaceBetween: 30,
    breakpoints: {
      // when window width is <= 499px
      768: {
        spaceBetween: 15,
      },
      // when window width is <= 999px
      1280: {
        spaceBetween: 20,
      },
    },
    loop: false,
    navigation: {
      nextEl: ".swiper-prev",
    },
  });
};
