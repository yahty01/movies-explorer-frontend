import { useRef, useEffect } from 'react';

// Кастомный хук useTimeout для управления таймерами
export const useTimeout = (callback, delay) => {
  const timeoutIdRef = useRef(); // useRef используется для хранения идентификатора таймера

  useEffect(() => {
    // useEffect реагирует на изменения в callback и delay
    if (delay !== null) {
      // Если delay не null, устанавливаем таймер
      timeoutIdRef.current = setTimeout(callback, delay);

      // Функция очистки для useEffect
      // Очищается при следующем рендере компонента или при размонтировании
      return () => clearTimeout(timeoutIdRef.current);
    }
  }, [callback, delay]);

  // Функция для явной очистки таймера
  const clear = () => clearTimeout(timeoutIdRef.current);

  return clear; // Возвращаем функцию очистки, чтобы ее можно было использовать вне хука
};
