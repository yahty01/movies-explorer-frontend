import { NavLink, useNavigate } from 'react-router-dom';
import '../NotFound/NotFound.scss'
export default function Page404() {
  const navigate = useNavigate();
  const handleClickComeBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <main className="notFound">
      <h1 className="notFound__heading">404</h1>
      <p className="notFound__message">Страница не найдена</p>
      <NavLink to="#" className="button notFound__link" onClick={handleClickComeBack}>
        Назад
      </NavLink>
    </main>
  );
}