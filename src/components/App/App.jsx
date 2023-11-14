import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Контексты
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// Утилиты
import { AuthRoute, ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useApiErrorHandling } from '../../hooks/useApiErrorHandling';
import { useInfoMessageHandling } from '../../hooks/useInfoMessageHandling';
import * as auth from '../../utils/auth/auth';
import mainApi from '../../utils/api/MainApi';
import { EDIT_PROFILE_SUCCESS_MSG } from '../../utils/constants';

// Компоненты
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ErrorMessage from '../ErrorPopup/ErrorPopup';
import InfoPopup from '../InfoPopup/InfoPopup';

// Стили
import './App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuthMessage, setErrorAuthMessage] = useState('');
  const [errorApiMessage, showApiError] = useApiErrorHandling();
  const [infoMessage, showInfoMessage] = useInfoMessageHandling();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await auth.checkToken();
        setLoggedIn(true);
        setCurrentUser(user);
      } catch {
        setLoggedIn(false);
      }
    })();
  }, []);

  const handleSuccessAuthAction = (user, resetForm) => {
    setErrorAuthMessage('');
    resetForm();
    setLoggedIn(true);
    setCurrentUser(user);
    navigate('/movies', { replace: true });
  };

  const handleSignUp = async (name, email, password, resetForm) => {
    setIsLoading(true);
    try {
      const user = await auth.signup(name, email, password);
      handleSuccessAuthAction(user, resetForm);
    } catch (err) {
      setErrorAuthMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (email, password, resetForm) => {
    setIsLoading(true);
    try {
      const user = await auth.signin(email, password);
      handleSuccessAuthAction(user, resetForm);
    } catch (err) {
      setErrorAuthMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signout();
      localStorage.clear();
      setLoggedIn(false);
    } catch (error) {
      showApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUserInfo = async (newUserInfo) => {
    setIsLoading(true);
    try {
      const updatedUser = await mainApi.changeUserInfo(newUserInfo);
      setCurrentUser(updatedUser);
      showInfoMessage(EDIT_PROFILE_SUCCESS_MSG);
    } catch (err) {
      setErrorAuthMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteButtonClick = async (movieId) => {
    return mainApi.deleteMovie(movieId);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn, isLoading, setIsLoading }}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<AuthRoute element={Register} onSignUp={handleSignUp} errorMessage={errorAuthMessage} setErrorAuthMessage={setErrorAuthMessage} />} />
          <Route path='/signin' element={<AuthRoute element={Login} onSignIn={handleSignIn} errorMessage={errorAuthMessage} setErrorAuthMessage={setErrorAuthMessage} />} />
          <Route path='/movies' element={<ProtectedRoute element={Movies} showError={showApiError} onDelete={handleDeleteButtonClick} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} showError={showApiError} onDelete={handleDeleteButtonClick} />} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} onSignOut={handleSignOut} onChangeUserInfo={handleChangeUserInfo} errorMessage={errorAuthMessage} setErrorAuthMessage={setErrorAuthMessage} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ErrorMessage errorMessage={errorApiMessage} />
        <InfoPopup infoMessage={infoMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
