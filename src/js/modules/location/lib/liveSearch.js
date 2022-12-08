import { elems, data } from "../variables.js";
import { addNewElems } from "./addNewElems.js";

export const liveSearch = (input) => {
  elems.innerHTML = "";

  data.search.items = [];

  let value = input.value.toLowerCase().trim();
  data.default.items.forEach((city) => {
    let subsrtIndex = city.name?.toLowerCase().search(value);
    if (subsrtIndex !== -1) {
      data.search.items.push({
        id: city.id,
        name: formatSubStr(city.name, subsrtIndex, value.length),
        state: city.state ? city.state : "",
      });
    }
  });

  addNewElems(data.search.flag);
};

const formatSubStr = (string, position, length) => {
  return (
    string.slice(0, position) +
    "<strong>" +
    string.slice(position, position + length) +
    "</strong>" +
    string.slice(position + length)
  );
};
