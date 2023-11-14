// Урл для основного API
const MAIN_API_URL = "https://api.kino.nomoredomainsrocks.ru";

// Урл для API фильмов
const MOVIES_API_URL = "https://api.nomoreparties.co";

// Сообщение об успешном редактировании профиля
const EDIT_PROFILE_SUCCESS_MSG = "Данные успешно отредактированы!";

// Сообщения об ошибке
const ERROR_DATA_NOT_CHANGED = "Такие данные уже используются. Измените данные.";
const ERROR_USER_REGISTRATION = "При регистрации пользователя произошла ошибка";
const ERROR_EMAIL_EXISTS = "Пользователь с таким email уже существует";
const ERROR_PROFILE_UPDATE = "При обновлении профиля произошла ошибка";
const ERROR_UNAUTHORIZED = "Вы ввели неправильную почту или пароль";
const ERROR_404 = "Страница по указанному маршруту не найдена";
const ERROR_USER_LOGIN = "При авторизации произошла ошибка";
const ERROR_SERVER = "Ошибка сервера";

export {
  MAIN_API_URL,
  MOVIES_API_URL,
  EDIT_PROFILE_SUCCESS_MSG,
  ERROR_EMAIL_EXISTS,
  ERROR_USER_REGISTRATION,
  ERROR_USER_LOGIN,
  ERROR_UNAUTHORIZED,
  ERROR_PROFILE_UPDATE,
  ERROR_DATA_NOT_CHANGED,
  ERROR_404,
  ERROR_SERVER,
};
