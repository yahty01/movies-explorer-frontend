import { useContext } from "react";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useFormWithValidation } from "../../utils/useFormWithValidation";

import Logo from "../Logo/Logo";
import "./Register.scss";

function Register({ onSignUp, errorMessage, setErrorAuthMessage }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const { isLoading } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values.name, values.email, values.password, resetForm);
  };

  const handleChangeInput = (e) => {
    setErrorAuthMessage("");
    handleChange(e);
  };

  return (
    <main className="register">
      <div className="register__container">
        <Logo />
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <fieldset className="register__fieldset">
            <label htmlFor="name" className="register__label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              minLength="2"
              required
              className={`register__field ${
                errors.name && "register__field_error"
              }`}
              value={values.name || ""}
              onChange={handleChangeInput}
              pattern="^[A-Za-zА-Яа-я\s\-]+$"
              title="Имя должно содержать только латиницу, кириллицу, пробел или дефис"
            />
            <span className="register__error-message">{errors.name}</span>
            <label htmlFor="email" className="register__label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email || ""}
              minLength="2"
              required
              className={`register__field ${
                errors.email && "register__field_error"
              }`}
              pattern="^\S+@\S+\.\S+$"
              title="Некорректный формат почты"
              onChange={handleChangeInput}
            />
            <span className="register__error-message">{errors.email}</span>
            <label htmlFor="password" className="register__label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password || ""}
              minLength="8"
              required
              className={`register__field ${
                errors.password && "register__field_error"
              }`}
              onChange={handleChangeInput}
            />
            <span className="register__error-message">{errors.password}</span>
          </fieldset>
          <div className="register__wrapper">
            <span className="register__error-message register__error-message_main">
              {errorMessage}
            </span>
            <button
              type="submit"
              className={`button register__button ${
                !isValid || errorMessage ? "register__button_disabled" : ""
              }`}
              aria-label="Зарегистрировать аккаунт"
              disabled={!isValid || errorMessage || isLoading}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className="register__message">
          Уже зарегистрированы?{" "}
          <Link className="link register__link" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
