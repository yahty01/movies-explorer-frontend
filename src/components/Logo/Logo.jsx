import { Link } from 'react-router-dom';
import './Logo.scss';

function Logo() {
  return <Link to='/' className='logo' aria-label='Перейти на главную страницу'></Link>;
}

export default Logo;
