import React, { useState, useEffect, useContext, useRef } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ERROR_DATA_NOT_CHANGED } from "../../utils/constants";
import Header from "../Header/Header";
import "./Profile.scss";

function Profile({
  onSignOut,
  onChangeUserInfo,
  errorMessage,
  setErrorAuthMessage,
}) {
  const { currentUser, isLoading } = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const prevNameRef = useRef(name);
  const prevEmailRef = useRef(email);

  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
  } = useFormValidation();

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
  }, [currentUser]);

  useEffect(() => {
    const enableEditModeIfError = () => {
      if (errorMessage) {
        setIsEditing(true);
      }
    };
  
    enableEditModeIfError();
  }, [errorMessage]);  

  useEffect(() => {
    const cleanupProfile = () => {
      setErrorAuthMessage("");
      setIsEditing(false);
    };
  
    return cleanupProfile;
  }, [setErrorAuthMessage]);
  

  const handleChangeInput = (event) => {
    const resetError = () => setErrorAuthMessage("");
    const updateFormValues = () => handleChange(event);
    const checkForChanges = () => {
      const nameNotChanged = prevNameRef.current.value === currentUser?.name;
      const emailNotChanged = prevEmailRef.current.value === currentUser?.email;
      if (nameNotChanged && emailNotChanged) {
        setErrorAuthMessage(ERROR_DATA_NOT_CHANGED);
      }
    };
  
    resetError();
    updateFormValues();
    checkForChanges();
  };
  

  const handleEditClick = () => setIsEditing(true);

  const handleSubmit  = (event) => {
    event.preventDefault();
  
    const updateUserInfo = () => {
      const updatedInfo = {
        name: values.name || name,
        email: values.email || email
      };
      onChangeUserInfo(updatedInfo);
    };
  
    const resetEditingState = () => {
      setIsEditing(false);
      setIsValid(false);
    };
  
    updateUserInfo();
    resetEditingState();
  };
  
  const NameInputField = () => {
    return isEditing ? (
      <div className="profile__field-container">
        <input
          type="text"
          name="name"
          minLength="2"
          pattern="^[A-Za-zА-Яа-я\s\-]+$"
          title="Имя должно содержать только латиницу, кириллицу, пробел или дефис"
          value={values.name || name}
          ref={prevNameRef}
          className={`profile__field-name ${
            errors.name ? "profile__field-name_error" : ""
          }`}
          onChange={handleChangeInput}
        />
        <span className="profile__error-message">{errors.name}</span>
      </div>
    ) : (
      <span className="profile__name-value">{name}</span>
    );
  };
  

  const renderEmailInput = () => {
    if (isEditing) {
      return (
        <div className="profile__field-container">
          <input
            type="email"
            name="email"
            value={values.email || email}
            ref={prevEmailRef}
            className={`profile__field-email ${
              errors.email && "profile__field-email_error"
            }`}
            onChange={handleChangeInput}
            pattern="^\S+@\S+\.\S+$"
            title="Некорректный формат почты"
          />
          <span className="profile__error-message">{errors.email}</span>
        </div>
      );
    } else {
      return <span className="email-value">{email}</span>;
    }
  };

  return (
    <>
      <Header dark={true} />
      <form className="profile" onSubmit={handleSubmit}>
        <div className="profile__container">
          <h1 className="profile__heading">Привет, {currentUser?.name}</h1>
          <div className="profile__name-row">
            <label htmlFor="name" className="profile__name-label">
              Имя
            </label>
            {NameInputField()}
          </div>
          <div className="profile__email-row">
            <label htmlFor="email" className="profile__email-label">
              E-mail
            </label>
            {renderEmailInput()}
          </div>

          {isEditing ? (
            <>
              <span className="profile__error">{errorMessage}</span>
              <button
                type="submit"
                className={`button profile__button${
                  !isValid || errorMessage ? " profile__button_disabled" : ""
                }`}
                aria-label="Сохранить данные"
                disabled={!isValid || errorMessage || isLoading}
              >
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="button profile__link-edit"
                href="/"
                onClick={handleEditClick}
                aria-label="Редактировать профиль"
              >
                Редактировать
              </button>
              <button
                type="button"
                className="button profile__link-exit"
                href="/signout"
                aria-label="Выйти из аккаунта"
                onClick={onSignOut}
                disabled={isLoading}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default Profile;
