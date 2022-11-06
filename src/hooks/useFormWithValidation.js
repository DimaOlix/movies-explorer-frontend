import React from 'react';


export function useFormWithValidation(value) {
  const [values, setValues] = React.useState(value);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors((errors) => {
      if(target.validity.patternMismatch) {
        target.setCustomValidity('В поле "Имя" можно вводить только: латиницу, кирилицу, пробел и "-"');
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

  return { values, handleChange, errors, isValid, resetForm };
}