import React from 'react';


export function useFormWithValidation(inputValues) {
  const [values, setValues] = React.useState(inputValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors((errors) => {
      if(target.validity.patternMismatch && name === 'name') {
        target.setCustomValidity('В поле "Имя" можно вводить только: латиницу, кирилицу, пробел и "-"');
      } else if(target.validity.patternMismatch && name === 'email') {
        target.setCustomValidity('Введенные данные не соответствуют стандарту email адресов');
      } else {
        target.setCustomValidity('');
      }
      return {...errors, [name]: target.validationMessage};
    });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}