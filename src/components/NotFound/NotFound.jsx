import { Outlet, Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <>
      <main className='notFound'>
        <h1 className='notFound__heading'>404</h1>
        <p className='notFound__message'>Страница не найдена</p>
        <Link to='/' className='notFound__link'>
          Назад
        </Link>
      </main>
      <Outlet /> {/* Размещаем компонент Outlet для отображения потомков */}
    </>
  );
}

export default NotFound;