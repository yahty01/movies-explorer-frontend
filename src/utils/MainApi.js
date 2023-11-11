import { MAIN_API_BASE_URL, MOVIE_API_BASE_URL } from './constants';
import { NOT_FOUND_ERROR, SERVER_ERROR, UPDATE_PROFILE_ERROR, EMAIL_EXISTS_ERROR } from './constants';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else if (res.status === 404) {
      return Promise.reject(NOT_FOUND_ERROR);
    } else if (res.status === 500) {
      return Promise.reject(SERVER_ERROR);
    } else {
      return res.json().then((err) => Promise.reject(err.message));
    }
  }

  getAllMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  addMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        description: movie.description,
        image: `${MOVIE_API_BASE_URL}${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${MOVIE_API_BASE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        year: movie.year,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 409) {
        return Promise.reject(EMAIL_EXISTS_ERROR);
      }
      return Promise.reject(UPDATE_PROFILE_ERROR);
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
