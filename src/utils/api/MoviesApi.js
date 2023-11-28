import { ERROR_404, ERROR_SERVER, MOVIES_API_URL } from '../constants';

/**
 * Класс для взаимодействия с API фильмов.
 */
class MoviesApi {
  /**
   * Создает экземпляр API для фильмов.
   * @param {object} options - опции для конструктора.
   */
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Проверяет HTTP-ответ от сервера.
   * @param {Response} res - объект ответа от fetch.
   * @returns {Promise<any>} - Промис с результатом ответа.
   */
  async _checkResponse(res) {
    if (res.ok) return res.json();

    switch (res.status) {
      case 404:
        throw new Error(ERROR_404);
      case 500:
        throw new Error(ERROR_SERVER);
      default:
        const errorData = await res.json();
        throw new Error(errorData.message);
    }
  }

  /**
   * Получает список фильмов с сервера.
   * @returns {Promise<Array>} - Промис с массивом фильмов.
   */
  async getMovies() {
    const response = await fetch(`${this.baseUrl}/beatfilm-movies`, {
      headers: this.headers,
    });
    const moviesData = await this._checkResponse(response);
    return moviesData;
  }  
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default moviesApi;
