import { DatePicker, DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  onChange: (value: string | null, context: PickerChangeHandlerContext<DateValidationError>) => void
  className?: string
};

export function DatePickerCustom({ onChange, className }: Props) {
  return (
    <DatePicker
      onChange={onChange}
      className={classNames('date-input', className)}
    />
  );
}
