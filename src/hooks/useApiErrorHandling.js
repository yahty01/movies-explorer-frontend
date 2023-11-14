import { useState } from 'react';

export const useApiErrorHandling = () => {
  const [errorApiMessage, setErrorApiMessage] = useState(null);

  const showApiError = (message) => {
    setErrorApiMessage(message);
    setTimeout(() => {
      setErrorApiMessage(null);
    }, 4000);
  };

  return [errorApiMessage, showApiError];
};
