import Logo from '../Logo/Logo';
import './Register.scss';

function Register() {
  return (
    <main className='register'>
      <div className='register__container'>
        <Logo />
        <h1 className='register__heading'>Добро пожаловать!</h1>
        <form className='register__form'>
          <fieldset className='register__fieldset'>
            <label htmlFor='name' className='register__label'>
              Имя
            </label>
            <input type='text' id='name' name='name' minLength='2' required className='register__field' />
            <label htmlFor='email' className='register__label'>
              Email:
            </label>
            <input type='email' id='email' name='email' minLength='2' required className='register__field' />
            {/*passwordInput*/}
            <label htmlFor='password' className='register__label'> 
              Пароль
            </label>
            <input type='password' id='password' name='password' minLength='8' required className='register__field register__field_error' />
            <span className='error-message'>Что-то пошло не так...</span>
          </fieldset>
          <button type='button' className='button register__button' aria-label='Зарегистрировать аккаунт'>
            Зарегистрироваться
          </button>
        </form>
        <p className='register__message'>
          Уже зарегистрированы?{' '}
          <a className='link register__link' href='/signin'>
            Войти
          </a>
        </p>
      </div>
    </main>
  );
}

export default Register;
