import {
  MAIN_API_URL as BASE_URL,
  ERROR_EMAIL_EXISTS,
  ERROR_USER_LOGIN,
  ERROR_UNAUTHORIZED,
  ERROR_USER_REGISTRATION,
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
      return Promise.reject(ERROR_EMAIL_EXISTS);
    }
    return Promise.reject(ERROR_USER_REGISTRATION);
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
      return Promise.reject(ERROR_UNAUTHORIZED);
    }
    return Promise.reject(ERROR_USER_LOGIN);
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
