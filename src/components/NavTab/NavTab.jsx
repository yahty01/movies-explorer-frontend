import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.scss';

function NavTab() {
  return (
    <nav className='navtab__links'>
      <Link to='/signup' className='link navtab__link' aria-label='Зарегистрироваться в сервисе'>
        Регистрация
      </Link>
      <Link to='/signin' className='button navtab__button' aria-label='Войти в аккаунт'>
        Войти
      </Link>
    </nav>
  );
}

export default NavTab;
