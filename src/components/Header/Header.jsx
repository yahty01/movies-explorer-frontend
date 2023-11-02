import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';
import Logo from '../Logo/Logo';
import './Header.scss';

function Header({ dark }) {
  const { loggedIn } = useContext(CurrentUserContext);
  const headerClass = `header ${dark ? 'header_mode_dark' : ''}`;

  return (
    <header className={headerClass}>
      <div className='header__container'>
        <div className='header__top-line'>
          <Logo />
          {/* Отображение Navigation или NavTab в зависимости от статуса входа */}
          {loggedIn ? <Navigation /> : <NavTab />}
        </div>
      </div>
    </header>
  );
}

export default Header;
