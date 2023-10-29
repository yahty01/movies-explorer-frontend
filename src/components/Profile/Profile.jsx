import { useState } from "react";
import Header from "../Header/Header";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("Егор");
  const [email, setEmail] = useState("mail@yandex.ru");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  console.log("рендеринг");

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignoutClick = () => {
    navigate("/signout");
  };

  const handleSaveClick = () => {
    console.log("click");
    setIsEditing(false);
  };
  return (
    <>
      <Header mode="dark" />
      <main>
        <section className="profile">
          <div className="profile__container">
            <h1 className="profile__heading">Привет, Егор!</h1>
            <div className="profile__name-row">
              <label htmlFor="name" className="profile__name-label">
                Имя
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  minLength="2"
                  value={name}
                  onChange={handleNameChange}
                  className="profile__field-name"
                />
              ) : (
                <span className="profile__name-value">{name}</span>
              )}
            </div>
            <div className="profile__email-row">
              <label htmlFor="email" className="profile__email-label">
                E-mail
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="profile__field-email"
                />
              ) : (
                <span className="email-value">{email}</span>
              )}
            </div>
            {isEditing ? (
              <>
                <span className="profile__error">
                  При обновлении профиля произошла ошибка.
                </span>
                <button
                  type="button"
                  className="profile__button profile__button_disabled"
                  onClick={handleSaveClick}
                  aria-label="Сохранить данные"
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <span
                  className="button profile__link-edit"
                  onClick={handleEditClick}
                  aria-label="Редактировать профиль"
                >
                  Редактировать
                </span>
                <button
                  type="button"
                  className="button profile__link-exit"
                  onClick={handleSignoutClick}
                  aria-label="Выйти из аккаунта"
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
