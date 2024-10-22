import { useState } from 'react';

export const useFormData = (validator = null, initialValues = {}) => {
  const [state, setState] = useState(() => ({
    values: initialValues,
    errors: {},
  }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    evt.target.setCustomValidity(error); // Show native validation

    const updatedValues = { ...state.values, [id]: value };
    const updatedErrors = { ...state.errors, [id]: error };
    const hasError = Object.values(updatedErrors).some((x) => x !== '');

    setState({ values: updatedValues, errors: updatedErrors, hasError });
  };

  return [state, change];
};