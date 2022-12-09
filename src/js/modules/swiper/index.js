import Swiper, { Navigation } from "swiper";

export const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation],
    direction: "horizontal",
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: ".swiper-prev",
    },
  });
};
