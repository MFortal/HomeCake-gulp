import { addHref } from "./modules/addHref.js";
import { checkBtns } from "./modules/setSlider.js";
import { addToggleEvent } from "./modules/addToggleEvent.js";
import { setOnloadEvent } from "./modules/setOnloadEvent.js";

// Якорь на кнопку "Связаться со мной"
addHref(".offer__button", "#contact");
// Якорь на кнопку "Посмотреть работы"
addHref(".main__button", "#assortment");
// Сладер
//checkBtns();
// Добавление событий раскрытия/закрытия для кнопок 'Еще'
addToggleEvent();
// Onload
setOnloadEvent();
