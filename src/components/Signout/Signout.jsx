import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Логика для выхода пользователя

    // Перенаправление на главную страницу
    navigate('/');
  }, [navigate]); // Добавление navigate в массив зависимостей

  return null;
};

export default Signout;