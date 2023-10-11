import { DatePicker, DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import classNames from 'classnames';
import './styles.scss';

type Props = {
  onChange: (value: string | null, context: PickerChangeHandlerContext<DateValidationError>) => void
  className?: string
} & React.ComponentProps<typeof DatePicker>;

export function DatePickerCustom({ onChange, className, ...props }: Props) {
  return (
    <DatePicker
      onChange={onChange}
      className={classNames('date-input', className)}
      {...props}
    />
  );
}
