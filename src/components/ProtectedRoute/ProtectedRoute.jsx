import { useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { loggedIn } = useContext(CurrentUserContext);
  const routeElement = useMemo(() => (
    loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
  ), [loggedIn, props]); 

  return routeElement;
};

const AuthRoute = ({ element: Component, ...props }) => {
  const { loggedIn } = useContext(CurrentUserContext);
  const routeElement = useMemo(() => (
    !loggedIn ? <Component {...props} /> : <Navigate to='/movies' replace />
  ), [loggedIn, props]); 

  return routeElement;
};

export { ProtectedRoute, AuthRoute };
