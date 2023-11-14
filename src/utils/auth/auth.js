import {
  MAIN_API_URL as BASE_URL,
  ERROR_EMAIL_EXISTS,
  ERROR_USER_LOGIN,
  ERROR_UNAUTHORIZED,
  ERROR_USER_REGISTRATION,
} from '../constants';

import { checkResponse, options } from './configAuth';

export const signup = (name, email, password) => {
  const body = JSON.stringify({ name, email, password });
  return fetch(`${BASE_URL}/signup`, { method: 'POST', ...options, body })
    .then(checkResponse)
    .catch((err) => {
      if (err.status === 409) {
        throw ERROR_EMAIL_EXISTS;
      } else {
        throw ERROR_USER_REGISTRATION;
      }
    });
};

export const signin = (email, password) => {
  const body = JSON.stringify({ password, email });
  return fetch(`${BASE_URL}/signin`, { method: 'POST', ...options, body })
    .then(checkResponse)
    .catch((err) => {
      if (err.status === 401) {
        throw ERROR_UNAUTHORIZED;
      } else {
        throw ERROR_USER_LOGIN;
      }
    });
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, { method: 'POST', ...options })
    .then(checkResponse);
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, { method: 'GET', ...options })
    .then(checkResponse);
};
