import Logo from '../Logo/Logo';
import './Login.scss';

function Login() {
  return (
    <main className='login'>
      <div className='login__container'>
        <Logo />
        <h1 className='login__heading'>Рады видеть!</h1>
        <form className='login__form'>
          <fieldset className='login__fieldset'>
            <label htmlFor='email' className='login__label'>
              E-mail:
            </label>
            <input type='email' id='email' name='email' minLength='2' maxLength='40' required className='login__field' placeholder='Введите ваш email' />
            <label htmlFor='password' className='login__label'>
              Пароль
            </label>
            <input type='password' id='password' name='password' minLength='8' required className='login__field' placeholder='Введите ваш пароль' />
          </fieldset>
          <button type='submit' className='button login__button' aria-label='Войти в свой аккаунт'>
            Войти
          </button>
        </form>
        <p className='login__message'>
          Ещё не зарегистрированы?{' '}
          <a className='link login__link' href='/signup'>
            Регистрация
          </a>
        </p>
      </div>
    </main>
  );
}

export default Login;