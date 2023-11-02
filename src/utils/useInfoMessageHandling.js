import { useState, useEffect } from 'react';

export const useInfoMessageHandling = () => {
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    let timeoutId;

    if (infoMessage !== null) {
      timeoutId = setTimeout(() => {
        setInfoMessage(null);
      }, 4000);
    }

    // Очистка таймера при размонтировании компонента
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [infoMessage]);

  const showInfoMessage = (message) => {
    setInfoMessage(message);
  };

  return [infoMessage, showInfoMessage];
};
