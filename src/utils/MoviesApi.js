import { NOT_FOUND_ERROR, SERVER_ERROR, MOVIE_API_BASE_URL } from './constants';

class MoviesApi {
  // Конструктор класса инициализирует базовый URL и заголовки для запросов
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // _checkResponse обрабатывает ответы от сервера
  // Возвращает JSON, если ответ успешный, иначе обрабатывает ошибки
  _checkResponse(res) {
    // Если ответ не ок, обрабатываем различные типы ошибок
    if (!res.ok) {
      // Выбор подходящего сообщения об ошибке на основе статуса ответа
      const error = res.status === 404 ? NOT_FOUND_ERROR : 
                    res.status === 500 ? SERVER_ERROR : 'Unexpected Error';
      // Возвращаем обещание с ошибкой, содержащее или сообщение от сервера, или выбранное сообщение об ошибке
      return res.json().then((err) => Promise.reject(err.message || error));
    }
    // В случае успешного ответа преобразуем ответ в JSON
    return res.json();
  }

  // Асинхронный метод для получения фильмов с сервера
  async getMovies() {
    // Отправляем запрос к серверу для получения списка фильмов
    const res = await fetch(`${this.baseUrl}/beatfilm-movies`, { headers: this.headers });
    // Используем _checkResponse для обработки ответа
    return this._checkResponse(res);
  }
}

// Инициализация экземпляра MoviesApi с указанием базового URL и заголовков
const moviesApi = new MoviesApi({
  baseUrl: MOVIE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
