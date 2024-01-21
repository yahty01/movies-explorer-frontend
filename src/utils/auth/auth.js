import {
  MAIN_API_URL as BASE_URL,
  ERROR_EMAIL,
  ERROR_USER_LOGIN,
  ERROR_UNAUTHORIZED,
  ERROR_REGISTRATION,
} from '../constants';

import { checkResponse, options } from './configAuth';

export const signup = async (name, email, password) => {
  const body = JSON.stringify({ name, email, password });
  try {
    const response = await fetch(`${BASE_URL}/signup`, { method: 'POST', ...options, body });
    return await checkResponse(response);
  } catch (err) {
    if (err.status === 409) {
      throw ERROR_EMAIL;
    } else {
      throw ERROR_REGISTRATION;
    }
  }
};

export const signin = async (email, password) => {
  const body = JSON.stringify({ password, email });
  try {
    const response = await fetch(`${BASE_URL}/signin`, { method: 'POST', ...options, body });
    return await checkResponse(response);
  } catch (err) {
    if (err.status === 401) {
      throw ERROR_UNAUTHORIZED;
    } else {
      throw ERROR_USER_LOGIN;
    }
  }
};

export const signout = async () => {
  const response = await fetch(`${BASE_URL}/signout`, { method: 'POST', ...options });
  return checkResponse(response);
};

export const checkToken = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, { method: 'GET', ...options });
  return checkResponse(response);
};
