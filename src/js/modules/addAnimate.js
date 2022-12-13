import AOS from "aos";

export let addAnimate = () => {
  AOS.init({
    delay: 300,
    easing: "ease",
    once: true,
  });
};
