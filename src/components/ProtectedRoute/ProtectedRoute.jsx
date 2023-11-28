import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(CurrentUserContext);

  if (!loggedIn) {
    return <Navigate to='/' replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { loggedIn } = useContext(CurrentUserContext);

  if (loggedIn) {
    return <Navigate to='/movies' replace />;
  }

  return children;
};

export {ProtectedRoute, AuthRoute}