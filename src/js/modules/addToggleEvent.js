// Событие на кнопку "Еще"
let buttonToggle = document.getElementsByClassName("buttonToggle");

export let addToggleEvent = () => {
  Array.from(buttonToggle).forEach((b) => {
    b.addEventListener("click", () => {
      let count;
      b.previousSibling.classList.contains("taste__cards")
        ? (count = 4)
        : (count = 2);
      for (let i = count; i < b.previousSibling.childNodes.length; i++) {
        b.previousSibling.childNodes[i].classList.toggle("_display");
      }
      let text = b.querySelector(".buttonToggle__text");
      let arrow = b.querySelector(".buttonToggle__arrow");
      if (text.textContent != "Еще") {
        text.textContent = "Еще";
        b.scrollIntoView(false);
      } else {
        text.textContent = "Свернуть";
      }
      arrow.classList.toggle("_rotate_90");
    });
  });
};
