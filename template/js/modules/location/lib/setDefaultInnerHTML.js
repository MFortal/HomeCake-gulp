import { data } from "../common.js";
import { addNewElems } from "./addNewElems.js";

// Зачистка всех элементов и отображение первых 10
export const setDefaultInnerHTML = (item) => {
  item.innerHTML = "";
  data.default.count = 10;
  addNewElems(data.default.flag);
};
