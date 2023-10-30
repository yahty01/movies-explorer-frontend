import React from 'react';
import { Navigate } from 'react-router-dom';

// Проверка авторизации 
const ProtectedRouteElement = ({ element: Component, loggedIn, ...props }) => {
  // Если пользователь вошел в систему, рендерим переданный компонент
  // В противном случае перенаправляем пользователя на страницу входа
  return loggedIn ? <Component {...props} /> : <Navigate to='/signin' replace />;
};

export default ProtectedRouteElement;