import { DatePicker, DatePickerProps, DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import classNames from 'classnames';
import './styles.scss';
import { Dayjs } from 'dayjs';

interface Props extends Omit<DatePickerProps<unknown>, 'onChange'> {
  onChange: (value: Dayjs, context: PickerChangeHandlerContext<DateValidationError>) => void
  className?: string
}

export function DatePickerCustom({ onChange, className, ...props }: Props) {
  return (
    <DatePicker
      className={classNames('date-input', className)}
      onChange={(value, context) => onChange(value as Dayjs, context)}
      {...props}
    />
  );
}
