import { useState } from 'react';

export const useApiErrorHandling = () => {
  const [errorApiMessage, setErrorApiMessage] = useState(null);

  const showApiError = (error) => {
    // Формирование сообщения об ошибке
    let errorMessage = 'Произошла ошибка';
    if (error) {
      errorMessage += ': ' + (error.message || '');
      if (error.response && error.response.status) {
        errorMessage += ' (Статус код: ' + error.response.status + ')';
      }
    }

    setErrorApiMessage(errorMessage);

    setTimeout(() => {
      setErrorApiMessage(null);
    }, 4000);
  };

  return [errorApiMessage, showApiError];
};
