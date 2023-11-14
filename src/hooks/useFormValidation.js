import { useReducer, useCallback } from "react";

// Редуктор для управления формой
const formReducer = (state, action) => {
  switch (action.type) {
    // Установить значение для конкретного поля 
    case "SET_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.payload.name]: action.payload.value },
        errors: { ...state.errors, [action.payload.name]: action.payload.error },
        isValid: action.payload.isValid,
      };
    // Установить общую валидность формы
    case "SET_VALID":
      return { ...state, isValid: action.payload };
    // Сбросить все значения формы
    case "RESET":
      return {
        values: action.payload.values,
        errors: action.payload.errors,
        isValid: action.payload.isValid,
      };
    default:
      throw new Error("Unsupported action type");
  }
};

export function useFormValidation() {
  // использование редуктора в кастомном хуке
  const [formState, dispatch] = useReducer(formReducer, {
    values: {},
    errors: {},
    isValid: false,
  });
  
  // обработчик для установки значений и ошибок при изменении полей формы
  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    const isValid = e.target.closest("form").checkValidity();
    dispatch({
      type: "SET_VALUE",
      payload: { name, value, error: validationMessage, isValid },
    });
  };

  // функция для установки валидности формы
  const setIsValid = useCallback((isValid) => {
    dispatch({
      type: "SET_VALID",
      payload: isValid,
    });
  }, []);
  
  // функция для сброса значений формы
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    dispatch({
      type: "RESET",
      payload: { values: newValues, errors: newErrors, isValid: newIsValid },
    });
  }, []);

  // возвращает необходимые функции и переменные состояния
  return {
    handleChange,
    errors: formState.errors,
    resetForm,
    values: formState.values,
    isValid: formState.isValid,
    setIsValid,
  };
}
