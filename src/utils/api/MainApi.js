import { fetchRequest } from "./request";
import { MAIN_API_URL, MOVIES_API_URL } from "../constants";
/**
 * Класс для работы с основным API.
 */
class MainApi {
  /**
   * Создает экземпляр API.
   * @param {object} options - Опции API, включая базовый URL и заголовки.
   */
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Получает все фильмы.
   * @returns {Promise<Array>} Промис с массивом фильмов.
   */
  async getAllMovies() {
    return await fetchRequest(`${this.baseUrl}/movies`, {}, this.headers);
  }

  /**
   * Добавляет новый фильм.
   * @param {object} movie - Объект данных фильма для добавления.
   * @returns {Promise<object>} Промис с результатом добавления фильма.
   */
  async addMovie(movie) {
    const {
      country,
      director,
      duration,
      description,
      image: { url, thumbnail },
      nameRU,
      nameEN,
      id,
      trailerLink,
      year,
    } = movie;

    return await fetchRequest(
      `${this.baseUrl}/movies`,
      {
        method: "POST",
        body: JSON.stringify({
          country,
          director,
          duration,
          description,
          image: `${MOVIES_API_URL}${url}`,
          nameRU,
          nameEN,
          thumbnail: `${MOVIES_API_URL}${thumbnail}`,
          movieId: id,
          trailerLink,
          year,
        }),
      },
      this.headers
    );
  }

  /**
   * Удаляет фильм по идентификатору.
   * @param {string} movieId - ID фильма для удаления.
   * @returns {Promise<object>} Промис с результатом удаления фильма.
   */
  async deleteMovie(movieId) {
    return await fetchRequest(
      `${this.baseUrl}/movies/${movieId}`,
      {
        method: "DELETE",
      },
      this.headers
    );
  }

  /**
   * Получает информацию о текущем пользователе.
   * @returns {Promise<object>} Промис с данными текущего пользователя.
   */
  async getUserInfo() {
    return await fetchRequest(`${this.baseUrl}/users/me`, {}, this.headers);
  }

  /**
   * Изменяет информацию пользователя.
   * @param {object} data - Объект с новыми данными пользователя.
   * @returns {Promise<object>} Промис с результатом обновления данных пользователя.
   */
  async changeUserInfo(data) {
    return await fetchRequest(
      `${this.baseUrl}/users/me`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      this.headers
    );
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default mainApi;
