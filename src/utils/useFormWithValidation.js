import { useState, useCallback } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event) => {
    const { target } = event;
    const { name, value, validity, title } = target;

    setValues(prevValues => ({ ...prevValues, [name]: value }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validity.patternMismatch ? title : target.validationMessage
    }));

    setIsValid(target.closest('form').checkValidity());
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, setIsValid, resetForm };
}
