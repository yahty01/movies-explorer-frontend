import {
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  UPDATE_PROFILE_ERROR,
  EMAIL_EXISTS_ERROR,
} from "./constants";

// Функция проверяет ответ сервера на наличие ошибок. 
// Если таковые обнаружены, будет выброшено исключение.
// Если ошибок нет, функция возвращает ответ сервера.
export async function checkResponse(res) {
  if (!res.ok) {
    const error = await res.json();

    switch (res.status) {
      case 404:
        throw new Error(NOT_FOUND_ERROR);
      case 500:
        throw new Error(SERVER_ERROR);
      case 409:
        throw new Error(EMAIL_EXISTS_ERROR);
      default:
        throw new Error(error.message || UPDATE_PROFILE_ERROR);
    }
  }

  return await res.json();
}

// Функция fetchRequest обрабатывает запрос к серверу.
// Она автоматически добавляет предопределенные опции и заголовки, если они не были указаны явно.
export async function fetchRequest(url, options = {}, headers) {
  // Добавляем дополнительные опции, если они не заданы
  const defaultOptions = {
    credentials: "include",
    headers,
  };

  // Выполнение запроса с указанными опциями и обработка полученного ответа
  const response = await fetch(url, { ...defaultOptions, ...options });
  return await checkResponse(response);
}
