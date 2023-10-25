// Импорт React и вспомогательных библиотек
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Импорт компонентов страниц
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

// Импорт вспомогательных компонентов и стилей
import ProtectedRouteElement from '../../utils/ProtectedRoute';
import './App.scss';

function App() {
  // Состояние для отслеживания статуса входа пользователя
  const [loggedIn] = useState(true);

  // Массив маршрутов
  const routes = [
    { path: '/', element: <Main /> },
    { path: '/signup', element: <Register /> },
    { path: '/signin', element: <Login /> },
    { path: '/movies', element: <ProtectedRouteElement element={Movies} loggedIn={loggedIn} /> },
    { path: '/saved-movies', element: <ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} /> },
    { path: '/profile', element: <ProtectedRouteElement element={Profile} loggedIn={loggedIn} /> },
    { path: '*', element: <NotFound /> },
  ];

  return (
    <div className='App'>
      <Routes>
        {/* Отображение маршрутов из массива */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;