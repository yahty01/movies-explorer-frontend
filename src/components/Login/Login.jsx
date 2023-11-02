import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Logo from '../Logo/Logo';
import './Login.scss';

function Login({ onSignIn, errorMessage, setErrorAuthMessage }) {
  // Использование кастомного хука для валидации формы
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  // Получение состояния загрузки из контекста
  const { isLoading } = useContext(CurrentUserContext);

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(values.email, values.password, resetForm);
  };

  // Обработчик изменения ввода в полях формы
  const handleChangeInput = (e) => {
    setErrorAuthMessage('');
    handleChange(e);
  };

  return (
    <main className='login'>
      <div className='login__container'>
        <Logo />
        <h1 className='login__heading'>Рады видеть!</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <fieldset className='login__fieldset'>
            <label htmlFor='email' className='login__label'>
              E-mail:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              minLength='2'
              maxLength='40'
              required
              className={`login__field ${errors.email && 'login__field_error'}`}
              value={values.email || ''}
              pattern='^\S+@\S+\.\S+$'
              title='Некорректный формат почты'
              onChange={handleChangeInput}
            />
            <span className='login__error-message'>{errors.email}</span>
            <label htmlFor='password' className='login__label'>
              Пароль
            </label>
            <input
              type='password'
              id='password'
              name='password'
              minLength='8'
              required
              className={`login__field ${errors.password && 'login__field_error'}`}
              value={values.password || ''}
              onChange={handleChangeInput}
            />
            <span className='login__error-message'>{errors.password}</span>
          </fieldset>

          <div className='login__wrapper'>
            <span className='login__error-message login__error-message_main'>{errorMessage}</span>
            <button
              type='submit'
              className={`button login__button ${!isValid || errorMessage ? 'login__button_disabled' : ''}`}
              aria-label='Войти в свой аккаунт'
              disabled={!isValid || errorMessage || isLoading}
            >
              Войти
            </button>
          </div>
        </form>
        <p className='login__message'>
          Ещё не зарегистрированы?{' '}
          <Link className='link login__link' to='/signup'>
            Регистрация
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
