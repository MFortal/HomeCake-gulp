import { elems } from "../variables.js";

export const getInnerHTMLElems = (elem, flag) => {
  if (elem) {
    if ("state" in elem) {
      elems.innerHTML += `
          <div class="location-elem" data-id=${elem.id} data-flag=${flag}>
            <span class="location-elem__city">${elem.name}</span>
            <span class="location-elem__city-state">${elem.state}</span>
          </div>`;
    } else {
      elems.innerHTML += `
          <div class="location-elem" data-id=${elem.id} data-flag=${flag}>
            <span class="location-elem__city">${elem.name}</span>
          </div>`;
    }
  }
};
