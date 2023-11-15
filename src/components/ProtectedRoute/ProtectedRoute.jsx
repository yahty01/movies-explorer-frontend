import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
    const { loggedIn } = useContext(CurrentUserContext);

    return (
        loggedIn 
            ? <Component {...props} />
            : <Navigate to='/' replace />
    );
};

const AuthRoute = ({ element: Component, ...props }) => {
    const { loggedIn } = useContext(CurrentUserContext);

    return (
        !loggedIn 
            ? <Component {...props} />
            : <Navigate to='/movies' replace />
    );
};

export { ProtectedRoute, AuthRoute };
