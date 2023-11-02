const MAIN_API_BASE_URL = 'https://api.kino.nomoredomainsrocks.ru';
const MOVIE_API_BASE_URL = 'https://api.nomoreparties.co';

const SHORT_FILM_DURATION = 40;

const EDIT_PROFILE_SUCCESS_MESSAGE = 'Данные успешно отредактированы!';

const SERVER_ERROR = 'Ошибка сервера';
const LOGIN_ERROR = 'При авторизации произошла ошибка';
const UNAUTHORIZED_ERROR = 'Вы ввели неправильную почту или пароль';
const NOT_FOUND_ERROR = 'Страница по указанному маршруту не найдена';
const EMAIL_EXISTS_ERROR = 'Пользователь с таким email уже существует';
const REGISTER_ERROR = 'При регистрации пользователя произошла ошибка';
const UPDATE_PROFILE_ERROR = 'При обновлении профиля произошла ошибка';
const DATA_NOT_CHANGED_ERROR = 'Такие данные уже используются. Измените данные.';

const SCREEN_SIZE_MAP = {
  xl: { cards: 16, addCardsNumber: 4 },
  lg: { cards: 12, addCardsNumber: 3 },
  md: { cards: 8, addCardsNumber: 4 },
  sm: { cards: 5, addCardsNumber: 2 },
};

export {
  SHORT_FILM_DURATION,
  EMAIL_EXISTS_ERROR,
  REGISTER_ERROR,
  LOGIN_ERROR,
  UNAUTHORIZED_ERROR,
  UPDATE_PROFILE_ERROR,
  MAIN_API_BASE_URL,
  MOVIE_API_BASE_URL,
  SCREEN_SIZE_MAP,
  DATA_NOT_CHANGED_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  EDIT_PROFILE_SUCCESS_MESSAGE,
};
