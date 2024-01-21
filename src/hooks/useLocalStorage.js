import { useEffect, useReducer } from 'react';

// Функция-редьюсер для управления состоянием хука useLocalStorage
function reducer(state, action) {
  switch (action.type) {
    case 'SET': // Действие для установки нового значения
      return action.payload;
    default: // В случае неизвестного действия выбрасываем ошибку
      throw new Error();
  }
}

// Хук useLocalStorage для сохранения и получения состояния из localStorage
function useLocalStorage(key, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    try {
      // Ленивая инициализация: попытка получить сохраненное значение из localStorage
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // При каждом изменении состояния обновляем значение в localStorage
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Ошибка при записи в localStorage:', error);
    }
  }, [key, state]); // Зависимости эффекта: ключ и состояние

  // Функция для обновления состояния, обертка для dispatch
  const setValue = value => dispatch({ type: 'SET', payload: value });

  return [state, setValue]; // Возвращаем состояние и функцию для его обновления
}

export default useLocalStorage;
