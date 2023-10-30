import { Outlet, useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  const navigate = useNavigate(); // Используем хук useNavigate для перехода на другую страницу

  return (
    <>
      <main className='notFound'>
        <h1 className='notFound__heading'>404</h1>
        <p className='notFound__message'>Страница не найдена</p>
        <button className='notFound__link' onClick={() => navigate('/')}>
          Назад
        </button>
      </main>
      <Outlet /> {/* Размещаем компонент Outlet для отображения потомков */}
    </>
  );
}

export default NotFound;