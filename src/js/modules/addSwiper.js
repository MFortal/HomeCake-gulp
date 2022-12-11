import Swiper, { Navigation } from "swiper";

export const addSwiper = () => {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation],
    direction: "horizontal",
    slidesPerView: "auto",
    spaceBetween: 30,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
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
