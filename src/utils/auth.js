import {
  MAIN_API_BASE_URL as BASE_URL,
  EMAIL_EXISTS_ERROR,
  LOGIN_ERROR,
  UNAUTHORIZED_ERROR,
  REGISTER_ERROR,
} from './constants';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json().then((data) => Promise.reject(data.message));
    } else {
      return res.text().then((text) => Promise.reject(text));
    }
  }
};

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export const signup = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 409) {
      return Promise.reject(EMAIL_EXISTS_ERROR);
    }
    return Promise.reject(REGISTER_ERROR);
  });
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 401) {
      return Promise.reject(UNAUTHORIZED_ERROR);
    }
    return Promise.reject(LOGIN_ERROR);
  });
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    ...options,
  }).then((res) => checkResponse(res));
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    ...options,
  }).then((res) => checkResponse(res));
};
