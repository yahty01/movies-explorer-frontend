import { fetchRequest } from "./request";
import { MAIN_API_BASE_URL, MOVIE_API_BASE_URL } from "./constants";

// Определение класса MainApi для взаимодействия с API.
class MainApi {
  // Конструктор принимает основной URL и заголовки API в качестве параметра.
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Метод для получения информации о всех фильмах от API.
  async getAllMovies() {
    return await fetchRequest(`${this.baseUrl}/movies`, {}, this.headers);
  }

  // Метод добавляет новый фильм. Принимает объект фильма в качестве параметра.
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
          image: `${MOVIE_API_BASE_URL}${url}`, // вставляем полный URL изображения фильма
          nameRU,
          nameEN,
          thumbnail: `${MOVIE_API_BASE_URL}${thumbnail}`, // вставляем полный URL миниатюры
          movieId: id,
          trailerLink,
          year,
        }),
      },
      this.headers
    );
  }

  // Метод удаляет фильм. Принимает id фильма в качестве параметра.
  async deleteMovie(movieId) {
    return await fetchRequest(
      `${this.baseUrl}/movies/${movieId}`,
      {
        method: "DELETE",
      },
      this.headers
    );
  }

  // Метод получает информацию о текущем пользователе.
  async getUserInfo() {
    return await fetchRequest(`${this.baseUrl}/users/me`, {}, this.headers);
  }

  // Метод изменяет информацию пользователя. Принимает объект с данными пользователя в качестве параметра.
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

// Создание экземпляра класса с заданными параметрами, которые будут использоваться по умолчанию.
const mainApi = new MainApi({
  baseUrl: MAIN_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Экспорт экземпляра API для дальнейшего использования.
export default mainApi;
