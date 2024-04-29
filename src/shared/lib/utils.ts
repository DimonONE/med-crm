import { string } from 'yup';

export const sexOptions = [{ value: -1, label: 'Пол' }, { value: 'man', label: 'Мужской' }, { value: 'woman', label: 'Женский' }];

export const passwordValidationSchema = string()
  .required('Password is required for creating')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character',
  );