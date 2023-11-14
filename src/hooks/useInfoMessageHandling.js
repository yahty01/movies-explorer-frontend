import { useState } from 'react';
import { useTimeout } from './useTimeout'; // Импортируем кастомный хук useTimeout

// Кастомный хук для отображения и автоматического скрытия информационных сообщений
export const useInfoMessageHandling = () => {
  const [infoMessage, setInfoMessage] = useState(null); // Состояние для хранения информационного сообщения

  // Функция для очистки сообщения
  const clearMessage = () => setInfoMessage(null);

  // Использование useTimeout для автоматической очистки сообщения через 4000 мс
  // Если infoMessage не null, устанавливаем таймер
  const clear = useTimeout(clearMessage, infoMessage ? 4000 : null);

  // Функция для отображения информационного сообщения
  // Перед показом нового сообщения очищаем предыдущее, если оно существует
  const showInfoMessage = (message) => {
    clear();
    setInfoMessage(message);
  };

  // Возвращаем состояние сообщения и функцию для его показа
  return [infoMessage, showInfoMessage];
};
