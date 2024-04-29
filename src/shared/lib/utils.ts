import { string } from 'yup';

export const sexOptions = [{ value: -1, label: 'Пол' }, { value: 'man', label: 'Мужской' }, { value: 'woman', label: 'Женский' }];

export const passwordValidationSchema = string()
  .required('Password is required for creating')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    'Пароль должен иметь длину не менее 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
  );