import browsersync from "browser-sync"; // Поиск и замена
import replace from "gulp-replace"; // Обработка ошибок
import plumber from "gulp-plumber"; // Сообщения (подсказки)
import notify from "gulp-notify"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновлений

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  newer: newer,
  browsersync: browsersync,
};
