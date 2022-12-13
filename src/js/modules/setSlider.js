// Карусель для отзывов
// let position = 0;
// const slidesToShow = 1;
// const slidesToScroll = 1;
// const container = document.querySelector(".slider");
// const track = document.querySelector(".slides");
// const item = document.querySelectorAll(".slider__review");
// const btnPrev = document.querySelector(".slider__nav_arrowPrev");
// const btnNext = document.querySelector(".slider__nav_arrowNext");
// const itemsCount = item.length;
// const itemWidth = container.offsetWidth / slidesToShow;
// const movePosition = slidesToScroll * itemWidth;

// item.forEach(function (item) {
//   item.style.minWidth = itemWidth + "px";
// });

// btnNext.onclick = function () {
//   console.log("next");
//   position -= movePosition;
//   setPosition();
//   checkBtns();
// };

// btnPrev.onclick = function () {
//   console.log("prev");
//   position += movePosition;
//   setPosition();
//   checkBtns();
// };

// const setPosition = () => {
//   track.style.transform = `translateX(${position}px)`;
// };

// export const checkBtns = () => {
//   if (position == 0) {
//     btnPrev.disabled = true;
//     btnPrev.firstChild.classList.add("arrow_disable");
//   } else {
//     btnPrev.disabled = false;
//     btnPrev.firstChild.classList.remove("arrow_disable");
//   }

//   if (position <= -(itemsCount - slidesToShow) * itemWidth) {
//     btnNext.disabled = true;
//     btnNext.firstChild.classList.add("arrow_disable");
//   } else {
//     btnNext.disabled = false;
//     btnNext.firstChild.classList.remove("arrow_disable");
//   }
// };
