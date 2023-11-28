import { useState } from 'react';
import './Navigation.scss';
import { NavLink, Link } from 'react-router-dom';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleForcePageReload = () => {
    if (window.location.pathname === '/saved-movies') {
      window.location.reload();
    }
  };
  return (
    <>
      {isMenuOpen && <div className='navigation__overlay' onClick={toggleMenu}></div>}
      <nav className={`navigation ${isMenuOpen ? 'navigation_active' : ''}`}>
        <div className='navigation__links'>
          {isMenuOpen && (
            <NavLink to='/' className='link navigation__link'>
              Главная
            </NavLink>
          )}
          <NavLink to='/movies' className='link navigation__link' aria-label='Перейти на страницу с фильмами'>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='link navigation__link'
            onClick={handleForcePageReload}
            aria-label='Перейти на страницу с сохраненными фильмами'
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to='/profile' className='button navigation__account-button' aria-label='Перейти на страницу профиля'>
          Аккаунт
        </Link>
        {!isMenuOpen && (
          <button
            type='button'
            className='button navigation__burger'
            onClick={toggleMenu}
            aria-label='Открыть навигационное меню'
          ></button>
        )}
        {isMenuOpen && (
          <button
            type='button'
            className='button navigation__burger-close'
            onClick={toggleMenu}
            aria-label='Закрыть навигационное меню'
          ></button>
        )}
      </nav>
    </>
  );
}

export default Navigation;
