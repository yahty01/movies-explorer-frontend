import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';
import { authPages } from '../../utils/constants';

import './Header.scss';

function Header({ mode }) {
  const location = useLocation();
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <header className={mode === 'dark' ? 'header header_mode_dark' : 'header'}>
      <div className='header__container'>
        <div className='header__top-line'>
          <Logo />
          {/* Навигация в зависимости от типа страницы */}
          {(isAuthPage) ? <Navigation /> : <NavTab />}
        </div>
      </div>
    </header>
  );
}

export default Header;