import { MOVIE_API_BASE_URL } from './constants';

class MoviesApi {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      const error = await res.text();
      try {
        const parsedError = JSON.parse(error);
        throw new Error(parsedError.message || error);
      } catch (e) {
        throw new Error(error);
      }
    }
  }

  async getMovies() {
    const res = await fetch(`${this.baseUrl}/beatfilm-movies`, {
      headers: this.headers,
    });
    return this._checkResponse(res);
  }
}

const moviesApi = new MoviesApi(MOVIE_API_BASE_URL, {
  'Content-Type': 'application/json',
});

export default moviesApi;
