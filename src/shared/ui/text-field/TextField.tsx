import classNames from 'classnames';
import { FieldProps } from 'formik';
import s from './styles.module.scss';

interface TextFieldProps extends FieldProps {
  type: 'text' | 'password'
  placeholder: string
  className?: string
  iconStart?: React.ReactElement
  iconEnd?: React.ReactElement
}

export function TextField(props: TextFieldProps) {
  const {
    field,
    iconStart,
    type = 'text',
    placeholder,
    iconEnd,
    className,
  } = props;
  return (
    <div className={classNames(s.textField, className)} >
      <div className={s.iconStart}>
        {iconStart && iconStart}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...field}
      />
      <div className={s.iconEnd}>
        {iconEnd && iconEnd}
      </div>

    </div>
  );
}