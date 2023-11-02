import {
  MAIN_API_BASE_URL as BASE_URL,
  EMAIL_EXISTS_ERROR,
  LOGIN_ERROR,
  UNAUTHORIZED_ERROR,
  REGISTER_ERROR,
} from './constants';

const checkResponse = async (res, errorOnFailure = REGISTER_ERROR) => {
  const contentType = res.headers.get('content-type');
  const data = contentType && contentType.includes('application/json')
    ? await res.json()
    : await res.text();

  if (res.ok) {
    return data;
  } else {
    if (res.status === 409) return Promise.reject(EMAIL_EXISTS_ERROR);
    if (res.status === 401) return Promise.reject(UNAUTHORIZED_ERROR);
    if (data.message) return Promise.reject(data.message);
    return Promise.reject(data || errorOnFailure);
  }
};

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export const signup = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ name, email, password }),
  });
  return checkResponse(res);
};

export const signin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res, LOGIN_ERROR);
};

export const signout = async () => {
  const res = await fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    ...options,
  });
  return checkResponse(res);
};

export const checkToken = async () => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    ...options,
  });
  return checkResponse(res);
};
