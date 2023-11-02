import { 
  MAIN_API_BASE_URL, 
  MOVIE_API_BASE_URL, 
  NOT_FOUND_ERROR, 
  SERVER_ERROR, 
  UPDATE_PROFILE_ERROR, 
  EMAIL_EXISTS_ERROR } 
  from './constants';


class MainApi {
  // Конструктор класса, инициализирует базовый URL и заголовки для API запросов
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Внутренний метод для проверки ответа сервера и обработки ошибок
  _checkResponse(res) {
    // Если ответ не OK, определяем тип ошибки и возвращаем ее
    if (!res.ok) {
      const error = res.status === 404 ? NOT_FOUND_ERROR : 
                    res.status === 500 ? SERVER_ERROR : 
                    UPDATE_PROFILE_ERROR;
      return res.json().then((err) => Promise.reject(err.message || error));
    }
    return res.json();
  }

  // Универсальный метод для отправки запросов, добавляет заголовки и креденшиалы к каждому запросу
  _fetch(url, options = {}) {
    return fetch(url, { ...options, headers: this.headers, credentials: 'include' }).then(this._checkResponse);
  }

  // Получение всех фильмов
  getAllMovies() {
    return this._fetch(`${this.baseUrl}/movies`);
  }

  // Добавление нового фильма
  addMovie(movie) {
    // Сбор данных фильма и подготовка тела запроса
    const { country, director, duration, description, image, id, nameRU, nameEN, trailerLink, year } = movie;
    const body = JSON.stringify({
      country, director, duration, description,
      image: `${MOVIE_API_BASE_URL}${image.url}`,
      movieId: id, nameRU, nameEN,
      thumbnail: `${MOVIE_API_BASE_URL}${image.url}`,
      trailerLink, year,
    });

    return this._fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      body,
    });
  }

  // Удаление фильма по ID
  deleteMovie(movieId) {
    return this._fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
    });
  }

  // Получение информации о пользователе
  getUserInfo() {
    return this._fetch(`${this.baseUrl}/users/me`);
  }

  // Изменение информации пользователя
  changeUserInfo(data) {
    return this._fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).catch((err) => {
      // Обработка специфической ошибки о существовании электронной почты
      if (err === EMAIL_EXISTS_ERROR) {
        return Promise.reject(EMAIL_EXISTS_ERROR);
      }
      throw err;
    });
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
