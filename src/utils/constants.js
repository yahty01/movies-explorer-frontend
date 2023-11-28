// Урл для основного API
const MAIN_API_URL = "https://api.kino.nomoredomainsrocks.ru";

// Урл для API фильмов
const MOVIES_API_URL = "https://api.nomoreparties.co";

// Сообщение об успешном редактировании профиля
const EDIT_PROFILE_SUCCESS_MSG = "Данные успешно отредактированы!";

// Сообщения об ошибке
const ERROR_DATA_NOT_CHANGED = "Такие данные уже используются. Измените данные.";
const ERROR_REGISTRATION = "При регистрации пользователя произошла ошибка";
const ERROR_PROFILE_UPDATE = "При обновлении профиля произошла ошибка";
const ERROR_UNAUTHORIZED = "Вы ввели неправильную почту или пароль";
const ERROR_EMAIL = "Пользователь с таким email уже существует";
const ERROR_404 = "Страница по указанному маршруту не найдена";
const ERROR_USER_LOGIN = "При авторизации произошла ошибка";
const ERROR_SERVER = "Ошибка сервера";

export {
  EDIT_PROFILE_SUCCESS_MSG,
  ERROR_DATA_NOT_CHANGED,
  ERROR_PROFILE_UPDATE,
  ERROR_UNAUTHORIZED,
  ERROR_REGISTRATION,
  ERROR_USER_LOGIN,
  MOVIES_API_URL,
  MAIN_API_URL,
  ERROR_SERVER,
  ERROR_EMAIL,
  ERROR_404,
};
