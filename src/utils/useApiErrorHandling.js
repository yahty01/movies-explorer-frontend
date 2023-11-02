import { useState, useEffect } from 'react';

export const useApiErrorHandling = () => {
  const [errorApiMessage, setErrorApiMessage] = useState(null);
  const messageDuration = 4000; // Время отображения сообщения в миллисекундах

  useEffect(() => {
    let timer;
    if (errorApiMessage) {
      timer = setTimeout(() => {
        setErrorApiMessage(null);
      }, messageDuration);
    }

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [errorApiMessage, messageDuration]);

  const showApiError = (message) => {
    setErrorApiMessage(message);
  };

  return [errorApiMessage, showApiError];
};
